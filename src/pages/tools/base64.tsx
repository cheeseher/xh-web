import React from 'react';
import Layout from '../../components/Layout';
import Base64Tool from '../../components/Base64Tool';
import { FaCode } from 'react-icons/fa';

const Base64Page: React.FC = () => {
  return (
    <Layout title="BASE64编解码 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaCode className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">BASE64编解码工具</h1>
                  <p className="mt-1 text-white/80">在线进行BASE64编码和解码转换</p>
                </div>
              </div>
            </div>

            {/* BASE64工具 */}
            <div className="p-6">
              <Base64Tool />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Base64Page; 