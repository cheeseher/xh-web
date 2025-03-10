import React from 'react';
import Layout from '../../components/Layout';
import FieldOrderTool from '../../components/FieldOrderTool';
import { FaSort } from 'react-icons/fa';

const FieldOrderPage: React.FC = () => {
  return (
    <Layout title="字段顺序 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaSort className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">字段顺序工具</h1>
                  <p className="mt-1 text-white/80">在线调整字段顺序和筛选</p>
                </div>
              </div>
            </div>

            {/* 字段顺序工具 */}
            <div className="p-6">
              <FieldOrderTool />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FieldOrderPage; 