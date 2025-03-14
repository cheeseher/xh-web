import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUser } from 'react-icons/fa';
import UserAccountLayout from '../../../components/UserAccountLayout';
import { useUser } from '../../../contexts/UserContext';

const UserAccountPage: React.FC = () => {
  const router = useRouter();
  const { user, isLoading, setUser } = useUser();
  const { tab } = router.query;
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 模拟登录功能
  const handleMockLogin = () => {
    setIsLoggingIn(true);
    setError(null);
    
    try {
      // 创建一个模拟用户
      const mockUser = {
        id: '1',
        username: 'test_user',
        email: 'test@example.com',
        isVip: true,
        vipLevel: 1,
        balance: 1000.00,
        createdAt: new Date().toISOString()
      };
      
      // 延迟一秒，模拟API请求
      setTimeout(() => {
        setUser(mockUser);
        // 保存到localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        setIsLoggingIn(false);
      }, 1000);
    } catch (err) {
      console.error('登录失败:', err);
      setError('登录失败，请重试');
      setIsLoggingIn(false);
    }
  };

  // 如果用户未登录，显示登录提示
  if (!isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#009688]/10 rounded-full flex items-center justify-center">
              <FaUser className="text-[#009688] text-2xl" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">需要登录</h2>
          <p className="text-gray-600 mb-6 text-center">
            您需要登录才能访问账户页面。
          </p>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleMockLogin}
              disabled={isLoggingIn}
              className="w-full bg-[#009688] text-white py-2 rounded-md hover:bg-[#00796b] transition-colors disabled:opacity-70"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  登录中...
                </span>
              ) : (
                "模拟登录"
              )}
            </button>
            <button
              onClick={() => router.push('/login')}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              返回登录页
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009688]"></div>
      </div>
    );
  }

  // 用户已登录，显示账户页面
  try {
    return (
      <UserAccountLayout 
        defaultTab={tab as string || 'profile'}
      />
    );
  } catch (err) {
    console.error('渲染账户页面失败:', err);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">加载失败</h2>
          <p className="text-gray-600 mb-6">
            加载账户页面时出错，请刷新页面重试。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00796b]"
          >
            刷新页面
          </button>
        </div>
      </div>
    );
  }
};

export default UserAccountPage; 