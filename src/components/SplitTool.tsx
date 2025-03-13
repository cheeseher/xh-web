import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const SplitTool: React.FC = () => {
  const [originalText, setOriginalText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [originalDelimiter, setOriginalDelimiter] = useState('');
  const [newDelimiter, setNewDelimiter] = useState('');

  // 转换函数
  const handleConvert = () => {
    try {
      if (!originalText || !originalDelimiter) {
        setOutputText('请输入原文本和原分隔符');
        return;
      }

      // 按原分隔符分割
      const parts = originalText.split(originalDelimiter);
      
      // 使用新分隔符连接（如果没有指定新分隔符，默认使用空格）
      const result = parts.filter(part => part.trim()).join(newDelimiter || ' ');
      
      setOutputText(result);
    } catch (error) {
      setOutputText('转换失败，请检查输入是否正确');
    }
  };

  // 复制函数
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* 原分隔符 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            原分割符
          </label>
        </div>
        <input
          type="text"
          placeholder="----"
          className="w-full px-4 h-[42px] border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={originalDelimiter}
          onChange={(e) => setOriginalDelimiter(e.target.value)}
        />
      </div>

      {/* 平台卡密 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            平台卡密
          </label>
        </div>
        <textarea
          placeholder="输入平台卡密字符"
          className="w-full px-4 py-[10.5px] border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent h-32 resize-none"
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
        />
      </div>

      {/* 新分隔符 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            新分割符
          </label>
        </div>
        <input
          type="text"
          placeholder="输入新分割符 EXP (:)"
          className="w-full px-4 h-[42px] border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={newDelimiter}
          onChange={(e) => setNewDelimiter(e.target.value)}
        />
      </div>

      {/* 转换结果 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            转换结果
          </label>
          <button
            onClick={() => handleCopy(outputText)}
            className="text-primary hover:text-primary-dark text-sm flex items-center"
          >
            <FaCopy className="mr-1" />
            点击复制
          </button>
        </div>
        <textarea
          placeholder="新卡密"
          className="w-full px-4 py-[10.5px] border rounded-md bg-gray-50 h-32 resize-none"
          value={outputText}
          readOnly
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex">
        <button
          onClick={handleConvert}
          className="h-[42px] px-6 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          格式化
        </button>
      </div>

      {/* 使用提示 */}
      <div className="mt-6 bg-[#009688]/5 border border-[#009688]/20 rounded-md p-4">
        <h3 className="text-gray-800 font-medium mb-2">使用提示</h3>
        <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
          <li>分隔符为每个字段间分割字符串</li>
          <li>字符分割工具，如果出现错误或者没有结果，请检查是否正确</li>
        </ol>
      </div>
    </div>
  );
};

export default SplitTool; 