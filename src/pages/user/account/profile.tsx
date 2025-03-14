import React, { useState } from 'react';
import { useRouter } from 'next/router';
import UserAccountLayout from '@/components/UserAccountLayout';
import { useUser } from '@/contexts/UserContext';

// 扩展User类型以包含额外的可选字段
interface ExtendedUserInfo {
  phone?: string;
  qq?: string;
  telegram?: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: (user as any)?.phone || '',
    qq: (user as any)?.qq || '',
    telegram: (user as any)?.telegram || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  if (!user) {
    // 如果用户未登录，重定向到登录页
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // 这里是模拟API调用，实际项目中应该调用真实的API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功响应
      setMessage({ type: 'success', text: '个人资料更新成功！' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: '更新失败，请稍后重试。' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UserAccountLayout title="个人资料">
      <div className="max-w-2xl mx-auto">
        {message.text && (
          <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* 用户名 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                用户名
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 h-[42px] border rounded-md ${isEditing ? 'bg-white focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]' : 'bg-gray-50'} transition-all`}
              />
            </div>

            {/* 邮箱 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 h-[42px] border rounded-md ${isEditing ? 'bg-white focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]' : 'bg-gray-50'} transition-all`}
              />
            </div>

            {/* 手机号 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                手机号
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 h-[42px] border rounded-md ${isEditing ? 'bg-white focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]' : 'bg-gray-50'} transition-all`}
              />
            </div>

            {/* QQ */}
            <div>
              <label htmlFor="qq" className="block text-sm font-medium text-gray-700 mb-1">
                QQ
              </label>
              <input
                type="text"
                id="qq"
                name="qq"
                value={formData.qq}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 h-[42px] border rounded-md ${isEditing ? 'bg-white focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]' : 'bg-gray-50'} transition-all`}
              />
            </div>

            {/* Telegram */}
            <div>
              <label htmlFor="telegram" className="block text-sm font-medium text-gray-700 mb-1">
                Telegram
              </label>
              <input
                type="text"
                id="telegram"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 h-[42px] border rounded-md ${isEditing ? 'bg-white focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]' : 'bg-gray-50'} transition-all`}
              />
            </div>

            {/* 会员信息 */}
            <div className="bg-[#009688]/5 p-4 rounded-md border border-[#009688]/20">
              <h3 className="text-sm font-medium text-gray-700 mb-2">会员信息</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">会员等级</p>
                  <p className="text-sm font-medium">
                    {user.vipLevel > 0 ? `VIP${user.vipLevel}` : '普通会员'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">账户余额</p>
                  <p className="text-sm font-medium">¥{user.balance.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">注册时间</p>
                  <p className="text-sm font-medium">2023-06-15</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">优惠折扣</p>
                  <p className="text-sm font-medium">9.5折</p>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-end space-x-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 h-[42px] border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 h-[42px] bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '保存中...' : '保存修改'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 h-[42px] bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors"
                >
                  编辑资料
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </UserAccountLayout>
  );
};

export default ProfilePage; 