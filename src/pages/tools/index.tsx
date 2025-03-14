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
import { FaInfoCircle } from 'react-icons/fa';

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
      <div className="max-w-5xl mx-auto py-4 sm:py-10 px-2 sm:px-4">
        {/* 页面标题 */}
        <div className="text-center mb-3 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">实用工具</h1>
          <p className="text-sm sm:text-base text-gray-600">一站式在线工具集，提高您的工作效率</p>
        </div>
        
        {/* 移动端无外层卡片，桌面端保留卡片 */}
        <div className="md:bg-white md:rounded-lg md:shadow-sm md:border md:border-gray-200 md:overflow-hidden md:transition-all md:duration-300 md:hover:shadow-md">
          {/* 移动端工具区域整体卡片 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden md:bg-transparent md:rounded-none md:shadow-none md:overflow-visible">
            {/* 工具标签栏 */}
            <div className="border-b border-gray-200">
              <div className="overflow-x-auto hide-scrollbar">
                <div className="flex whitespace-nowrap">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors
                        ${activeTab === tab.id 
                          ? 'border-b-2 border-primary text-primary' 
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                        }
                      `}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 工具内容区域 */}
            <div className="p-4 sm:p-6">
              <div className="mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                  {tabs.find(tab => tab.id === activeTab)?.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  {getToolDescription(activeTab)}
                </p>
              </div>
              
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

// 获取工具使用提示
const getToolTips = (toolId: string): string => {
  switch (toolId) {
    case '2fa':
      return '输入您的两步验证密钥，系统将自动生成验证码。密钥通常由服务提供商提供，格式为字母和数字的组合。';
    case 'base64':
      return '在左侧输入框中输入要编码或解码的文本，然后点击相应的按钮进行操作。结果将显示在右侧输出框中。';
    case 'json-format':
      return '将JSON数据粘贴到输入框中，点击格式化按钮，系统将自动格式化并检查JSON的有效性。';
    case 'char-split':
      return '输入要分割的文本和分隔符，系统将按照指定的分隔符分割文本并显示结果。';
    case 'data-to-csv':
      return '输入数据（每行一条记录），选择分隔符，系统将自动转换为CSV格式，可直接下载或复制。';
    case 'field-order':
      return '输入数据并指定字段顺序，系统将按照指定的顺序重新排列数据字段。';
    case 'data-remove':
      return '输入原始数据和要删除的内容，系统将自动删除指定内容并显示处理后的结果。';
    case 'field-complete':
      return '输入缺失字段的数据和完整的字段模板，系统将自动补全缺失的字段。';
    case 'cookie-json':
      return '将浏览器Cookie字符串粘贴到输入框中，系统将自动转换为JSON格式，便于分析和处理。';
    default:
      return '选择左侧的工具，按照提示操作即可使用相应功能。如有问题，请联系客服。';
  }
};

export default ToolsPage;