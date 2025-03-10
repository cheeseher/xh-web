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
    { id: '2fa', name: '2FA生成' },
    { id: 'base64', name: 'Base64' },
    { id: 'cookie-json', name: 'Cookie转JSON' },
    { id: 'char-split', name: '字符分割' },
    { id: 'json-format', name: 'JSON格式化' },
    { id: 'data-to-csv', name: '数据转CSV' },
    { id: 'field-order', name: '字段排序' },
    { id: 'field-complete', name: '字段补全' },
    { id: 'data-remove', name: '数据去重' },
  ];

  const renderTool = () => {
    switch (activeTab) {
      case '2fa':
        return <TwoFactorTool />;
      case 'base64':
        return <Base64Tool />;
      case 'char-split':
        return <SplitTool />;
      case 'json-format':
        return <JsonTool />;
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
    <Layout title="实用工具 - 账户商城" showAlert={false}>
      <div className="max-w-5xl mx-auto">
        {/* 工具标签栏 */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          <div className="overflow-x-auto">
            <div className="flex p-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 工具内容区域 */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          {renderTool()}
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage; 