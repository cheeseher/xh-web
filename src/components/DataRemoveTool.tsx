import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const DataRemoveTool: React.FC = () => {
  const [delimiter, setDelimiter] = useState('');
  const [originalData, setOriginalData] = useState('');
  const [removeData, setRemoveData] = useState('');
  const [resultData, setResultData] = useState('');

  // 剔除函数
  const handleRemove = () => {
    try {
      if (!originalData || !delimiter) {
        setResultData('请填写完整信息');
        return;
      }

      // 处理原始数据和需要剔除的数据
      const originalLines = originalData.split('\n').filter(line => line.trim());
      const removeLines = removeData.split('\n').filter(line => line.trim());
      
      // 创建一个Set来存储需要剔除的数据，以提高查找效率
      const removeSet = new Set(removeLines);
      
      // 过滤原始数据，保留不在剔除集合中的行
      const result = originalLines.filter(line => !removeSet.has(line));

      // 如果没有剩余数据
      if (result.length === 0) {
        setResultData('没有剩余数据');
        return;
      }

      setResultData(result.join('\n'));
    } catch (error) {
      setResultData('处理失败，请检查输入是否正确');
    }
  };

  // 复制函数
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 分隔符 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            分割符
          </label>
        </div>
        <input
          type="text"
          placeholder="----"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
        />
      </div>

      {/* 原始数据 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            原始数据
          </label>
        </div>
        <textarea
          placeholder="输入原始数据"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent h-32 resize-none"
          value={originalData}
          onChange={(e) => setOriginalData(e.target.value)}
        />
      </div>

      {/* 剔除数据 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            剔除数据
          </label>
        </div>
        <textarea
          placeholder="输入需要被删除的数据"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent h-32 resize-none"
          value={removeData}
          onChange={(e) => setRemoveData(e.target.value)}
        />
      </div>

      {/* 结果数据 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            结果数据
          </label>
          <button
            onClick={() => handleCopy(resultData)}
            className="text-primary hover:text-primary-dark text-sm flex items-center"
          >
            <FaCopy className="mr-1" />
            点击复制
          </button>
        </div>
        <textarea
          placeholder="结果数据"
          className="w-full px-4 py-2 border rounded-md bg-gray-50 h-32 resize-none"
          value={resultData}
          readOnly
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex space-x-4">
        <button
          onClick={handleRemove}
          className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          剔除数据
        </button>
      </div>

      {/* 友情提示 */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-md">
        <h3 className="text-yellow-800 font-medium mb-2">友情提示</h3>
        <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
          <li>数据剔除工具，如果出现错误或者没有结果，请检查是否正确。</li>
        </ul>
      </div>
    </div>
  );
};

export default DataRemoveTool; 