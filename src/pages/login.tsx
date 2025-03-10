import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import Captcha from '../components/Captcha';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // 验证邮箱
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    // 验证密码
    if (!formData.password) {
      newErrors.password = '请输入密码';
    }

    // 验证验证码
    if (!formData.captcha.trim()) {
      newErrors.captcha = '请输入验证码';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: 实现登录逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 登录成功后跳转
      router.push('/');
    } catch (error) {
      console.error('登录失败:', error);
      setErrors(prev => ({
        ...prev,
        submit: '登录失败，请检查邮箱和密码'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaRefresh = () => {
    setFormData(prev => ({ ...prev, captcha: '' }));
  };

  return (
    <Layout title="登录 - 账户商城">
      <div className="container-custom py-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">登录</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="请输入邮箱"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* 密码 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                密码
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="请输入密码"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* 验证码 */}
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-1">
                验证码
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.captcha ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="请输入验证码"
                />
                <Captcha onRefresh={handleCaptchaRefresh} />
              </div>
              {errors.captcha && (
                <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>
              )}
            </div>

            {/* 额外选项 */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">记住我</span>
              </label>
              <Link href="/forgot-password" className="text-primary hover:underline">
                忘记密码？
              </Link>
            </div>

            {/* 错误提示 */}
            {errors.submit && (
              <div className="text-red-500 text-sm text-center">{errors.submit}</div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? '登录中...' : '登录'}
            </button>

            {/* 注册链接 */}
            <div className="text-center text-sm text-gray-600">
              还没有账号？
              <Link href="/register" className="text-primary hover:underline ml-1">
                立即注册
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;