import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const Base64Tool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  // 编码或解码函数
  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        // 编码为Base64
        const encoded = btoa(inputText);
        setOutputText(encoded);
      } else {
        // 从Base64解码
        const decoded = atob(inputText);
        setOutputText(decoded);
      }
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
      {/* 模式选择 - 标签栏样式 */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setMode('encode')}
            className={`py-2 px-6 font-medium text-sm focus:outline-none ${
              mode === 'encode'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            编码
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`py-2 px-6 font-medium text-sm focus:outline-none ${
              mode === 'decode'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            解码
          </button>
        </div>
      </div>

      {/* 输入文本 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {mode === 'encode' ? '原始文本' : 'Base64文本'}
          </label>
        </div>
        <textarea
          placeholder={
            mode === 'encode' ? '输入需要编码的文本' : '输入需要解码的Base64文本'
          }
          className="w-full px-4 py-[10.5px] border rounded-md bg-gray-50 h-32 resize-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      {/* 转换结果 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {mode === 'encode' ? 'Base64编码结果' : '解码结果'}
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
          placeholder={
            mode === 'encode' ? 'Base64编码结果' : '解码后的文本将显示在这里'
          }
          className="w-full px-4 py-[10.5px] border rounded-md bg-gray-50 h-32 resize-none"
          value={outputText}
          readOnly
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex">
        <button
          onClick={handleConvert}
          className="h-[42px] px-6 bg-[#009688] text-white rounded hover:bg-[#00796b] transition-all"
        >
          {mode === 'encode' ? '编码' : '解码'}
        </button>
      </div>

      {/* 友情提示 */}
      <div className="mt-6 bg-[#009688]/5 p-4 rounded-md border border-[#009688]/20">
        <h3 className="text-gray-800 font-medium mb-2">友情提示</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          <li>Base64编码可以将二进制数据转换为ASCII字符串格式。</li>
          <li>解码时请确保输入的是有效的Base64编码字符串。</li>
          <li>
            Base64编码通常用于在HTTP环境下传输二进制数据，如图片、音频等。
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Base64Tool; 