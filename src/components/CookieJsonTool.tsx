import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const CookieJsonTool: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [cookieText, setCookieText] = useState('');
  const [outputText, setOutputText] = useState('');

  // 转换函数
  const handleConvert = () => {
    try {
      if (!cookieText || !domain) {
        setOutputText('请填写完整信息');
        return;
      }

      // 处理域名
      const domains = domain.split(',').map(d => d.trim());

      // 处理Cookie文本
      const cookieLines = cookieText.split('\n').filter(line => line.trim());
      
      // 创建结果数组
      const result = domains.map(domain => {
        // 处理每个域名的cookies
        const cookies = cookieLines.map(line => {
          const parts = line.split(';').map(part => part.trim());
          const cookieObj: any = {
            domain: domain
          };

          parts.forEach(part => {
            if (part.includes('=')) {
              const [key, value] = part.split('=').map(item => item.trim());
              if (key.toLowerCase() === 'expires') {
                cookieObj.expirationDate = Math.floor(new Date(value).getTime() / 1000);
              } else {
                cookieObj[key] = value;
              }
            }
          });

          // 添加必要的字段
          cookieObj.hostOnly = false;
          cookieObj.httpOnly = false;
          cookieObj.path = "/";
          cookieObj.secure = true;
          cookieObj.session = true;
          cookieObj.storeId = "0";

          return cookieObj;
        });

        return cookies;
      }).flat(); // 扁平化数组

      setOutputText(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutputText('转换失败，请检查输入格式是否正确');
    }
  };

  // 复制函数
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Domain */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Domain
          </label>
        </div>
        <input
          type="text"
          placeholder="输入域名，例如: instagram.com,facebook.com,twitter.com"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>

      {/* Cookies */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Cookies
          </label>
        </div>
        <textarea
          placeholder="输入Cookies串，exp:aaa=xxx;bbb=xxx;"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent h-32 resize-none"
          value={cookieText}
          onChange={(e) => setCookieText(e.target.value)}
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
          className="w-full px-4 py-2 border rounded-md bg-gray-50 h-32 resize-none"
          value={outputText}
          readOnly
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex space-x-4">
        <button
          onClick={handleConvert}
          className="flex-1 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          格式转化
        </button>
      </div>

      {/* 友情提示 */}
      <div className="mt-6 bg-yellow-50 p-4 rounded-md">
        <h3 className="text-yellow-800 font-medium mb-2">友情提示</h3>
        <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
          <li>可转换Cookies格式为 ";" 号分开。</li>
          <li>一次可进行多条cookies进行格式化。</li>
        </ul>
      </div>
    </div>
  );
};

export default CookieJsonTool; 