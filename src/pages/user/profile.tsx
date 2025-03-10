import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaUser, FaCheck } from 'react-icons/fa';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [nickname, setNickname] = useState(user?.username || '');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError('昵称不能为空');
      return;
    }
    
    if (nickname.length < 2 || nickname.length > 20) {
      setError('昵称长度应在2-20个字符之间');
      return;
    }
    
    // 模拟API调用
    setTimeout(() => {
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    }, 500);
  };

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <Layout title="修改昵称 - 账户商城" showAlert={false}>
      <div className="max-w-md mx-auto">
        <div className="card p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <FaUser className="text-primary text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-medium">个人资料</h2>
              <p className="text-sm text-gray-500">修改您的个人信息</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                昵称
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="input"
                placeholder="请输入新昵称"
              />
              <p className="mt-1 text-xs text-gray-500">
                昵称长度2-20个字符，支持中英文、数字和下划线
              </p>
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                账号
              </label>
              <input
                type="text"
                value={user.email || '未设置'}
                disabled
                className="input bg-gray-50 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500">
                账号不可修改
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                保存修改
              </button>
            </div>
          </form>

          {success && (
            <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-md flex items-center">
              <FaCheck className="mr-2" />
              <span>昵称修改成功</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage; 