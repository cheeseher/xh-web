import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FaTools } from 'react-icons/fa';
import SplitTool from '../../components/SplitTool';
import JsonTool from '../../components/JsonTool';
import CsvTool from '../../components/CsvTool';
import FieldOrderTool from '../../components/FieldOrderTool';
import FieldCompleteTool from '../../components/FieldCompleteTool';
import DataRemoveTool from '../../components/DataRemoveTool';
import CookieJsonTool from '../../components/CookieJsonTool';
import TwoFactorAuth from '../../components/TwoFactorAuth';
import Base64Tool from '../../components/Base64Tool';

const ToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('split');

  const tabs = [
    { id: 'split', name: '字符分割' },
    { id: 'json', name: 'JSON格式化' },
    { id: 'csv', name: '数据转CSV' },
    { id: 'field-order', name: '字段顺序' },
    { id: 'field-complete', name: '字段补全' },
    { id: 'data-remove', name: '数据剔除' },
    { id: 'cookie-json', name: 'Cookie转JSON' },
    { id: '2fa', name: '2FA验证码' },
    { id: 'base64', name: 'BASE64编解码' },
  ];

  const renderTool = () => {
    switch (activeTab) {
      case 'split':
        return <SplitTool />;
      case 'json':
        return <JsonTool />;
      case 'csv':
        return <CsvTool />;
      case 'field-order':
        return <FieldOrderTool />;
      case 'field-complete':
        return <FieldCompleteTool />;
      case 'data-remove':
        return <DataRemoveTool />;
      case 'cookie-json':
        return <CookieJsonTool />;
      case '2fa':
        return <TwoFactorAuth onSubmit={() => {}} />;
      case 'base64':
        return <Base64Tool />;
      default:
        return null;
    }
  };

  return (
    <Layout title="工具合集 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaTools className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">工具合集</h1>
                  <p className="mt-1 text-white/80">便捷的数据处理工具集</p>
                </div>
              </div>
            </div>

            {/* 标签栏 */}
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      py-4 px-6 text-sm font-medium whitespace-nowrap
                      ${activeTab === tab.id
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* 工具内容 */}
            <div className="p-6">
              {renderTool()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage; 