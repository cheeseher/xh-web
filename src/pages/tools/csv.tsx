import React from 'react';
import Layout from '../../components/Layout';
import CsvTool from '../../components/CsvTool';
import { FaFileExcel } from 'react-icons/fa';

const CsvPage: React.FC = () => {
  return (
    <Layout title="数据转CSV - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaFileExcel className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">数据转CSV工具</h1>
                  <p className="mt-1 text-white/80">在线将数据转换为CSV格式</p>
                </div>
              </div>
            </div>

            {/* CSV工具 */}
            <div className="p-6">
              <CsvTool />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CsvPage; 