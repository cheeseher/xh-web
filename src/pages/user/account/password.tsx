import React, { useState } from 'react';
import { useRouter } from 'next/router';
import UserAccountLayout from '@/components/UserAccountLayout';
import { useUser } from '@/contexts/UserContext';

const PasswordPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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

    // 清除对应字段的错误信息
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // 验证当前密码
    if (!formData.currentPassword) {
      newErrors.currentPassword = '请输入当前密码';
    }

    // 验证新密码
    if (!formData.newPassword) {
      newErrors.newPassword = '请输入新密码';
    } else if (formData.newPassword.length < 6 || formData.newPassword.length > 16) {
      newErrors.newPassword = '密码长度应为6-16个字符';
    }

    // 验证确认密码
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认新密码';
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // 这里是模拟API调用，实际项目中应该调用真实的API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功响应
      setMessage({ type: 'success', text: '密码修改成功！' });
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: '密码修改失败，请稍后重试。' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UserAccountLayout title="修改密码">
      <div className="max-w-md mx-auto">
        {message.text && (
          <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 当前密码 */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              当前密码
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full px-4 h-[42px] border ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all`}
              placeholder="请输入当前密码"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          {/* 新密码 */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              新密码
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full px-4 h-[42px] border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all`}
              placeholder="6-16个字符"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* 确认新密码 */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              确认新密码
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 h-[42px] border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all`}
              placeholder="请再次输入新密码"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* 密码安全提示 */}
          <div className="bg-[#009688]/5 p-4 rounded-md border border-[#009688]/20 text-sm text-gray-600">
            <h3 className="font-medium text-gray-700 mb-2">密码安全提示</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>密码长度应为6-16个字符</li>
              <li>建议使用字母、数字和符号的组合</li>
              <li>请勿使用与其他网站相同的密码</li>
              <li>定期更换密码可以提高账户安全性</li>
            </ul>
          </div>

          {/* 提交按钮 */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-[42px] bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? '提交中...' : '修改密码'}
            </button>
          </div>
        </form>
      </div>
    </UserAccountLayout>
  );
};

export default PasswordPage; 