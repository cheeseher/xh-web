import React from 'react';
import Layout from '../../components/Layout';
import SplitTool from '../../components/SplitTool';
import { FaCode } from 'react-icons/fa';

const SplitPage: React.FC = () => {
  return (
    <Layout title="字符分割 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaCode className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">字符分割工具</h1>
                  <p className="mt-1 text-white/80">在线进行字符分割转换</p>
                </div>
              </div>
            </div>

            {/* 分割工具 */}
            <div className="p-6">
              <SplitTool />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SplitPage; 