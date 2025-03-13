import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const JsonTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [delimiter, setDelimiter] = useState('');
  const [fieldName, setFieldName] = useState('');

  // 格式化函数
  const handleFormat = () => {
    try {
      // 如果有分隔符，先按分隔符分割
      if (delimiter) {
        const lines = inputText.split('\n');
        const result = lines.map(line => {
          const parts = line.split(delimiter);
          if (fieldName) {
            // 如果有字段名称，创建对象
            const fields = fieldName.split(delimiter);
            const obj: any = {};
            fields.forEach((field, index) => {
              if (field && parts[index]) {
                obj[field.trim()] = parts[index].trim();
              }
            });
            return obj;
          }
          return parts;
        });
        setOutputText(JSON.stringify(result, null, 2));
      } else {
        // 直接格式化JSON
        const parsed = JSON.parse(inputText);
        setOutputText(JSON.stringify(parsed, null, 2));
      }
    } catch (error) {
      setOutputText('格式化失败，请检查输入是否正确');
    }
  };

  // 复制函数
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* 分隔符 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            分割符
          </label>
        </div>
        <input
          type="text"
          placeholder="输入分隔符，例如逗号、空格等"
          className="w-full px-4 h-[42px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
        />
      </div>

      {/* 字段名称 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            字段名称
          </label>
        </div>
        <input
          type="text"
          placeholder="输入字段名，以空格分割 (EXP: account password)"
          className="w-full px-4 h-[42px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
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
          className="w-full px-4 py-[10.5px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] h-32 resize-none transition-all"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
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
            className="text-[#009688] hover:text-[#00796b] text-sm transition-all flex items-center"
          >
            <FaCopy className="mr-1" />
            点击复制
          </button>
        </div>
        <textarea
          placeholder="JSON格式化结果"
          className="w-full px-4 py-[10.5px] border rounded-md bg-gray-50 h-32 resize-none"
          value={outputText}
          readOnly
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex">
        <button
          onClick={handleFormat}
          className="h-[42px] px-6 bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-all"
        >
          格式化
        </button>
      </div>

      {/* 友情提示 */}
      <div className="mt-6 bg-[#009688]/5 p-4 rounded-md border border-[#009688]/20">
        <h3 className="text-gray-800 font-medium mb-2">友情提示</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          <li>字段是对应下方位置字段名称。</li>
          <li>分隔符为每个字段间分割字符串。</li>
          <li>如果出现错误或者没有结果，请检查输入是否正确。</li>
        </ul>
      </div>
    </div>
  );
};

export default JsonTool; 