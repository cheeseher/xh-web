import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaUser, FaEnvelope, FaLock, FaCrown } from 'react-icons/fa';

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [nickname, setNickname] = useState(user?.username || '');

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      // 这里模拟更新用户信息
      if (user) {
        const updatedUser = {
          ...user,
          username: formData.username,
          email: formData.email,
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setMessage({ type: 'success', content: '个人信息更新成功！' });
        setIsEditing(false);
      }
    } catch (error) {
      setMessage({ type: 'error', content: '更新失败，请稍后重试' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNicknameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      // 这里模拟修改昵称的API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', content: '昵称修改成功！' });
    } catch (error) {
      setMessage({ type: 'error', content: '修改失败，请稍后重试' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <Layout title="个人资料 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 用户信息头部 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center">
                <img
                  src={user.avatar || '/images/default-avatar.png'}
                  alt="用户头像"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                />
                <div className="ml-6">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold">{user.username}</h1>
                    {user.isVip && (
                      <div className="ml-3 flex items-center bg-yellow-400 text-primary px-3 py-1 rounded-full">
                        <FaCrown className="mr-1" />
                        <span>VIP{user.vipLevel}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-white/80">注册时间：{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* 表单部分 */}
            <form onSubmit={handleSubmit} className="p-6">
              {message.content && (
                <div className={`mb-4 p-4 rounded-md ${
                  message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {message.content}
                </div>
              )}

              <div className="space-y-6">
                {/* 基本信息 */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">基本信息</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        用户名
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
                        />
                        <FaUser className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱地址
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
                        />
                        <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 修改密码 */}
                {isEditing && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">修改密码</h2>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          当前密码
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <FaLock className="absolute right-3 top-3 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          新密码
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <FaLock className="absolute right-3 top-3 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          确认新密码
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <FaLock className="absolute right-3 top-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                      >
                        保存修改
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                      编辑资料
                    </button>
                  )}
                </div>
              </div>
            </form>

            <form onSubmit={handleNicknameSubmit} className="p-6">
              {message.content && (
                <div className={`mb-6 p-4 rounded-md ${
                  message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {message.content}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    昵称
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <FaUser className="absolute right-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-2 border rounded-md bg-gray-50 cursor-not-allowed"
                    />
                    <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">邮箱地址不可修改</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? '提交中...' : '保存修改'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage; 