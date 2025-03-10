import React from 'react';
import Layout from '../../components/Layout';
import CookieJsonTool from '../../components/CookieJsonTool';
import { FaCookie } from 'react-icons/fa';

const CookieJsonPage: React.FC = () => {
  return (
    <Layout title="Cookie转JSON - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaCookie className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">Cookie转JSON工具</h1>
                  <p className="mt-1 text-white/80">在线将Cookie字符串转换为JSON格式</p>
                </div>
              </div>
            </div>

            {/* Cookie转JSON工具 */}
            <div className="p-6">
              <CookieJsonTool />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookieJsonPage; 