import React from 'react';
import Layout from '../components/Layout';

const CustomerServicePage: React.FC = () => {
  return (
    <Layout title="在线客服 - 星海账户">
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">在线客服（第三方）</h1>
          <p className="text-gray-600">客服系统正在加载中...</p>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerServicePage; 