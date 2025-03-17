import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useUser } from '../contexts/UserContext';
import { FaUser, FaLock } from 'react-icons/fa';
import { login } from '../utils/auth';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
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
    setError('');
    setIsLoading(true);

    try {
      // 调用登录函数
      const user = await login(formData.username, formData.password);
      
      // 保存用户信息到 localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // 更新用户状态
      setUser(user);

      // 如果有重定向参数，则跳转到指定页面，否则跳转到首页
      if (redirect && typeof redirect === 'string') {
        router.push(redirect);
      } else {
        router.push('/');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '登录失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="登录 - 星海账户" hidePageTitle={true}>
      <div className="min-h-[600px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* 标题 */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                账户登录
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                还没有账号？
                <Link href={redirect ? `/register?redirect=${encodeURIComponent(redirect as string)}` : "/register"} className="text-primary hover:text-primary-dark ml-1">
                  立即注册
                </Link>
              </p>
            </div>

            {/* 登录表单 */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  用户名
                </label>
                <div className="mt-1 relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-4 h-[42px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent"
                    placeholder="请输入用户名"
                  />
                  <FaUser className="absolute right-3 top-3.5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  密码
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-4 h-[42px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent"
                    placeholder="请输入密码"
                  />
                  <FaLock className="absolute right-3 top-3.5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#009688] focus:ring-[#009688] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    记住我
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center h-[42px] px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#009688] hover:bg-[#00796b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009688] ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? '登录中...' : '登录'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;