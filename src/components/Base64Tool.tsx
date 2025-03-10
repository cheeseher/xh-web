import React, { useState } from 'react';

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  // 处理编码和解码
  const handleConvert = () => {
    if (!input.trim()) return;
    
    try {
      // 尝试解码，如果失败则进行编码
      try {
        const result = atob(input);
        setDecoded(result);
        setEncoded(input);
      } catch {
        const result = btoa(input);
        setEncoded(result);
        setDecoded(input);
      }
    } catch (error) {
      setEncoded('处理失败，请检查输入');
      setDecoded('处理失败，请检查输入');
    }
  };

  // 文本框和复制按钮组件
  const ResultField = ({ label, value }: { label: string; value: string }) => (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button
          onClick={() => value && navigator.clipboard.writeText(value)}
          className="px-4 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          点击复制
        </button>
      </div>
      <textarea
        value={value}
        readOnly
        placeholder={`${label}将显示在这里`}
        className="w-full px-4 py-2 border rounded-md bg-gray-50 h-32 resize-none"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      {/* 输入区域 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          原始编码
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入卡密中BASE64代码/字符"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent h-32 resize-none"
        />
      </div>

      {/* 结果区域 */}
      <ResultField label="编码结果" value={encoded} />
      <ResultField label="解码结果" value={decoded} />

      {/* 操作按钮 */}
      <button
        onClick={handleConvert}
        className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
      >
        编码/解码
      </button>

      {/* 友情提示 */}
      <div className="bg-yellow-50 p-4 rounded-md">
        <h3 className="text-yellow-800 font-medium mb-2">友情提示</h3>
        <ol className="text-sm text-yellow-700 list-decimal list-inside">
          <li>BASE64编解码工具，如果出现错误或者没有结果，请检查是否正确。</li>
        </ol>
      </div>
    </div>
  );
};

export default Base64Tool; 