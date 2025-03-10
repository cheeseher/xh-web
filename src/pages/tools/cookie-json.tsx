import React from 'react';
import Layout from '../../components/Layout';
import CookieJsonTool from '../../components/CookieJsonTool';

const CookieJsonPage: React.FC = () => {
  return (
    <Layout title="Cookie转JSON - 账户商城" showAlert={false}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-xl font-bold mb-4">Cookie转JSON</h1>
          <p className="text-gray-600 mb-6">
            将浏览器Cookie字符串转换为标准JSON格式，方便在各类工具中使用。
          </p>
          <CookieJsonTool />
        </div>
      </div>
    </Layout>
  );
};

export default CookieJsonPage; 