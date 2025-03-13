import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

const CookieJsonTool: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [cookieText, setCookieText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = () => {
    if (!domain) {
      setError('请输入域名');
      return;
    }

    if (!cookieText) {
      setError('请输入Cookie字符串');
      return;
    }

    setError('');
    try {
      // 解析Cookie字符串
      const cookies = cookieText.split(';').map(cookie => cookie.trim());
      const result = cookies.map(cookie => {
        const [name, value] = cookie.split('=').map(part => part.trim());
        if (!name || value === undefined) return null;

        return {
          domain: domain,
          expirationDate: Math.floor(Date.now() / 1000) + 86400 * 30, // 30天后过期
          hostOnly: true,
          httpOnly: false,
          name: name,
          path: "/",
          sameSite: "unspecified",
          secure: true,
          session: false,
          storeId: "0",
          value: value
        };
      }).filter(Boolean);

      setOutputText(JSON.stringify(result, null, 2));
    } catch (err) {
      setError('Cookie格式错误，请检查输入');
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 域名 */}
      <div className="mb-4">
        <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
          域名
        </label>
        <input
          type="text"
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="例如: example.com"
          className="w-full px-4 h-[42px] border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      {/* Cookie字符串 */}
      <div className="mb-6">
        <label htmlFor="cookieText" className="block text-sm font-medium text-gray-700 mb-2">
          Cookie字符串
        </label>
        <textarea
          id="cookieText"
          value={cookieText}
          onChange={(e) => setCookieText(e.target.value)}
          placeholder="粘贴Cookie字符串，例如: name=value; name2=value2"
          className="w-full px-4 py-[10.5px] border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-32"
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm mb-4">{error}</div>
      )}
      
      {/* JSON结果 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="outputText" className="block text-sm font-medium text-gray-700">
            JSON结果
          </label>
          <button
            onClick={handleCopy}
            disabled={!outputText}
            className={`text-sm flex items-center ${outputText ? 'text-primary hover:text-primary-dark' : 'text-gray-400 cursor-not-allowed'}`}
          >
            {copied ? (
              <>
                <FaCheck className="mr-1" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <FaCopy className="mr-1" />
                <span>复制</span>
              </>
            )}
          </button>
        </div>
        <textarea
          id="outputText"
          value={outputText}
          readOnly
          className="w-full px-4 py-[10.5px] border rounded-md bg-gray-50 focus:outline-none resize-none h-32"
          placeholder="转换后的JSON将显示在这里"
        />
      </div>
      
      {/* 操作按钮 */}
      <div className="flex">
        <button
          onClick={handleConvert}
          className="h-[42px] px-6 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          转换为JSON
        </button>
      </div>
      
      {/* 使用提示 */}
      <div className="mt-6 bg-[#009688]/5 border border-[#009688]/20 rounded-md p-4">
        <h3 className="text-gray-800 font-medium mb-2">使用提示</h3>
        <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
          <li>在输入框中粘贴需要转换的Cookie字符串</li>
          <li>点击"转换"按钮，系统会自动将Cookie转换为JSON格式</li>
          <li>转换后的JSON数据会显示在结果框中，可以直接复制使用</li>
          <li>如果出现错误或没有结果，请检查Cookie格式是否正确</li>
        </ol>
      </div>
    </div>
  );
};

export default CookieJsonTool; 