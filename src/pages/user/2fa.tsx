import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import TwoFactorAuth from '../../components/TwoFactorAuth';
import { FaShieldAlt } from 'react-icons/fa';

const TwoFactorAuthPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = (code: string) => {
    // 这里处理2FA验证逻辑
    console.log('2FA code submitted:', code);
  };

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <Layout title="2FA验证 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaShieldAlt className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">2FA验证</h1>
                  <p className="mt-1 text-white/80">使用2FA验证码增强账户安全性</p>
                </div>
              </div>
            </div>

            {/* 2FA验证表单 */}
            <div className="p-6">
              <TwoFactorAuth onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TwoFactorAuthPage; 