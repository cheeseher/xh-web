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
          className="px-4 py-1 bg-[#009688] text-white rounded hover:bg-[#00796b] transition-all text-sm"
        >
          点击复制
        </button>
      </div>
      <textarea
        value={value}
        readOnly
        placeholder={`${label}将显示在这里`}
        className="w-full px-4 py-[10.5px] border rounded-md bg-gray-50 h-32 resize-none"
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
          className="w-full px-4 py-[10.5px] border rounded-md focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] h-32 resize-none transition-all"
        />
      </div>

      {/* 结果区域 */}
      <ResultField label="编码结果" value={encoded} />
      <ResultField label="解码结果" value={decoded} />

      {/* 操作按钮 */}
      <div className="flex">
        <button
          onClick={handleConvert}
          className="px-6 py-[10.5px] bg-[#009688] text-white rounded hover:bg-[#00796b] transition-all"
        >
          编码/解码
        </button>
      </div>

      {/* 使用提示 */}
      <div className="bg-[#009688]/5 border border-[#009688]/20 rounded-lg p-4">
        <h3 className="text-gray-800 font-medium mb-2">使用提示</h3>
        <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
          <li>在输入框中粘贴需要编码或解码的文本内容</li>
          <li>点击"编码/解码"按钮，系统会自动判断并进行相应操作</li>
          <li>编码结果和解码结果会同时显示，您可以根据需要使用任意一个</li>
          <li>如果出现错误或没有结果，请检查输入内容是否正确</li>
        </ol>
      </div>
    </div>
  );
};

export default Base64Tool; 