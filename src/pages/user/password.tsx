import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaKey } from 'react-icons/fa';

const PasswordPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里添加修改密码的逻辑
    console.log('修改密码:', formData);
  };

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <Layout title="修改密码 - 星海账户">
      <div className="container-custom py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <FaKey className="text-primary text-xl" />
                </div>
                <div className="ml-4">
                  <h1 className="text-xl font-bold text-gray-900">修改密码</h1>
                  <p className="text-sm text-gray-500">设置您的账户密码</p>
                </div>
              </div>
            </div>

            {/* 表单 */}
            <form onSubmit={handleSubmit} className="px-6 pb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    当前密码
                  </label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="请输入当前密码"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    新密码
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="请输入新密码"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    确认新密码
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="请再次输入新密码"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mt-6"
              >
                确认修改
              </button>
            </form>

            {/* 提示信息 */}
            <div className="px-6 pb-6">
              <div className="bg-yellow-50 p-4 rounded-md">
                <h3 className="text-yellow-800 font-medium mb-2">温馨提示</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>1. 密码长度需在8-20个字符之间</li>
                  <li>2. 密码必须包含字母和数字</li>
                  <li>3. 为了账户安全，建议使用复杂密码</li>
                  <li>4. 修改密码后需要重新登录</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PasswordPage; 