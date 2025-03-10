import React from 'react';
import Layout from '../../components/Layout';
import DataRemoveTool from '../../components/DataRemoveTool';
import { FaEraser } from 'react-icons/fa';

const DataRemovePage: React.FC = () => {
  return (
    <Layout title="数据剔除 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaEraser className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">数据剔除工具</h1>
                  <p className="mt-1 text-white/80">在线剔除重复或不需要的数据</p>
                </div>
              </div>
            </div>

            {/* 数据剔除工具 */}
            <div className="p-6">
              <DataRemoveTool />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataRemovePage; 