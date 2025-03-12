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
import { 
  FaShieldAlt, FaCode, FaFileCode, FaTable, FaSort, 
  FaTrash, FaClipboard, FaCookie, FaTools, FaInfoCircle 
} from 'react-icons/fa';

const ToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('2fa');

  const tabs = [
    { id: '2fa', name: '2FA验证码', icon: <FaShieldAlt /> },
    { id: 'base64', name: 'BASE64编解码', icon: <FaCode /> },
    { id: 'json-format', name: 'JSON格式化', icon: <FaFileCode /> },
    { id: 'char-split', name: '字符分割', icon: <FaClipboard /> },
    { id: 'data-to-csv', name: '数据转CSV', icon: <FaTable /> },
    { id: 'field-order', name: '字段排序', icon: <FaSort /> },
    { id: 'data-remove', name: '数据删除', icon: <FaTrash /> },
    { id: 'field-complete', name: '字段补全', icon: <FaClipboard /> },
    { id: 'cookie-json', name: 'Cookie转JSON', icon: <FaCookie /> },
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
      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">实用工具</h1>
          <p className="text-gray-600">一站式在线工具集，提高您的工作效率</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* 工具标签栏 */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative px-4 py-3 text-sm font-medium transition-all duration-200 mx-1 rounded-t-lg flex items-center
                      ${activeTab === tab.id
                        ? 'bg-white text-gray-800 shadow-sm border-t border-l border-r border-gray-200'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}
                    `}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 工具内容区域 */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center">
                <span className="p-2 rounded-full bg-gray-100 mr-3">
                  {tabs.find(tab => tab.id === activeTab)?.icon}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {tabs.find(tab => tab.id === activeTab)?.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {getToolDescription(activeTab)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              {renderTool()}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-start">
              <FaInfoCircle className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">使用提示</p>
                <p>{getToolTips(activeTab)}</p>
              </div>
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