import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const Base64Tool: React.FC = () => {
  const [originalText, setOriginalText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');

  // 编码函数
  const handleEncode = () => {
    try {
      const encoded = btoa(originalText);
      setEncodedText(encoded);
    } catch (error) {
      setEncodedText('编码失败，请检查输入是否正确');
    }
  };

  // 解码函数
  const handleDecode = () => {
    try {
      const decoded = atob(encodedText);
      setDecodedText(decoded);
    } catch (error) {
      setDecodedText('解码失败，请检查输入是否正确');
    }
  };

  // 复制函数
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 原始编码 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            原始编码
          </label>
        </div>
        <textarea
          placeholder="输入卡密中BASE64代码/字符"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent h-32 resize-none"
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
        />
      </div>

      {/* 编码结果 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            编码结果
          </label>
          <button
            onClick={() => handleCopy(encodedText)}
            className="text-primary hover:text-primary-dark text-sm flex items-center"
          >
            <FaCopy className="mr-1" />
            点击复制
          </button>
        </div>
        <textarea
          placeholder="BASE64字符编码结果"
          className="w-full px-4 py-2 border rounded-md bg-gray-50 h-32 resize-none"
          value={encodedText}
          readOnly
        />
      </div>

      {/* 解码结果 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            解码结果
          </label>
          <button
            onClick={() => handleCopy(decodedText)}
            className="text-primary hover:text-primary-dark text-sm flex items-center"
          >
            <FaCopy className="mr-1" />
            点击复制
          </button>
        </div>
        <textarea
          placeholder="BASE64字符解码结果"
          className="w-full px-4 py-2 border rounded-md bg-gray-50 h-32 resize-none"
          value={decodedText}
          readOnly
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex space-x-4">
        <button
          onClick={handleEncode}
          className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          编码
        </button>
        <button
          onClick={handleDecode}
          className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          解码
        </button>
      </div>

      {/* 友情提示 */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-md">
        <h3 className="text-yellow-800 font-medium mb-2">友情提示</h3>
        <p className="text-sm text-yellow-700">
          BASE64编解码工具，如果出现错误或者没有结果，请检查是否正确。
        </p>
      </div>
    </div>
  );
};

export default Base64Tool; 