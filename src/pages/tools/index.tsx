import React, { useState } from 'react';
import Layout from '../../components/Layout';
import CookieJsonTool from '../../components/CookieJsonTool';
import SplitTool from '../../components/SplitTool';
import JsonTool from '../../components/JsonTool';
import CsvTool from '../../components/CsvTool';
import FieldOrderTool from '../../components/FieldOrderTool';
import FieldCompleteTool from '../../components/FieldCompleteTool';
import DataRemoveTool from '../../components/DataRemoveTool';
import TwoFactorTool from '../../components/TwoFactorTool';
import Base64Tool from '../../components/Base64Tool';

const ToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('2fa');

  const tabs = [
    { id: '2fa', name: '2FA验证码' },
    { id: 'base64', name: 'BASE64编解码' },
    { id: 'json-format', name: 'JSON格式化' },
    { id: 'char-split', name: '字符分割' },
    { id: 'data-to-csv', name: '数据转CSV' },
    { id: 'field-order', name: '字段排序' },
    { id: 'data-remove', name: '数据删除' },
    { id: 'field-complete', name: '字段补全' },
    { id: 'cookie-json', name: 'Cookie转JSON' },
  ];

  const renderTool = () => {
    switch (activeTab) {
      case '2fa':
        return <TwoFactorTool />;
      case 'base64':
        return <Base64Tool />;
      case 'json-format':
        return <JsonTool />;
      case 'char-split':
        return <SplitTool />;
      case 'data-to-csv':
        return <CsvTool />;
      case 'field-order':
        return <FieldOrderTool />;
      case 'field-complete':
        return <FieldCompleteTool />;
      case 'data-remove':
        return <DataRemoveTool />;
      case 'cookie-json':
        return <CookieJsonTool />;
      default:
        return <TwoFactorTool />;
    }
  };

  return (
    <Layout title="工具集合 - 星海账户" showAlert={false}>
      <div className="max-w-5xl mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">工具集合</h1>
        
        {/* 工具标签栏 */}
        <div className="border-b border-gray-200 mb-6">
          <div className="overflow-x-auto">
            <div className="flex space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 工具内容区域 */}
        <div className="bg-white border border-gray-200 rounded-md p-6">
          {renderTool()}
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage; 