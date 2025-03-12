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
    <Layout title="实用工具 - 星海账户" showAlert={false} hidePageTitle={true}>
      <div className="max-w-5xl mx-auto py-6 px-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-xl font-bold">实用工具</h1>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* 工具标签栏 */}
          <div className="border-b border-gray-200">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative px-3 py-2 text-xs font-medium transition-all duration-200 mx-1"
                  >
                    {tab.name}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 工具内容区域 */}
          <div className="p-4">
            <div className="mb-3">
              <h2 className="text-base font-semibold text-gray-800">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              <p className="text-xs text-gray-500">
                {getToolDescription(activeTab)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {renderTool()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// 获取工具描述
const getToolDescription = (toolId: string): string => {
  switch (toolId) {
    case '2fa':
      return '生成两步验证码，用于账户安全验证，支持标准的TOTP协议';
    case 'base64':
      return '将文本转换为Base64编码或将Base64编码解码为文本';
    case 'json-format':
      return '格式化JSON数据，使其更易于阅读和编辑';
    case 'char-split':
      return '按指定字符分割文本，便于数据处理和分析';
    case 'data-to-csv':
      return '将数据转换为CSV格式，方便导入到Excel等电子表格软件';
    case 'field-order':
      return '对数据字段进行排序，调整字段顺序';
    case 'data-remove':
      return '从数据中删除指定内容，清理不需要的数据';
    case 'field-complete':
      return '补全缺失的数据字段，确保数据完整性';
    case 'cookie-json':
      return '将浏览器Cookie转换为JSON格式，便于分析和处理';
    default:
      return '';
  }
};

export default ToolsPage; 