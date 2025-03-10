import React, { useState } from 'react';
import { FaCopy, FaSync } from 'react-icons/fa';

interface TwoFactorAuthProps {
  onSubmit?: (code: string) => void;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  const [backupCode, setBackupCode] = useState('123456'); // 模拟2FA备用码
  const [validationCode, setValidationCode] = useState(''); // 模拟动态验证码

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(code);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(validationCode);
  };

  const handleRefreshCode = () => {
    // 模拟刷新验证码
    setValidationCode(Math.random().toString(36).substr(2, 6));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* 2FA验证码输入 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          2FA验证码
        </label>
        <input
          type="text"
          placeholder="输入卡密中2FA代码"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {/* 2FA验证码显示 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            2FA验证码
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyCode}
              className="text-primary hover:text-primary-dark text-sm flex items-center"
            >
              <FaCopy className="mr-1" />
              点击复制
            </button>
          </div>
        </div>
        <div className="flex">
          <input
            type="text"
            value={validationCode}
            readOnly
            className="flex-1 px-4 py-2 border rounded-l-md bg-gray-50 cursor-not-allowed"
          />
          <button
            onClick={handleRefreshCode}
            className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark flex items-center"
          >
            <FaSync className="mr-1" />
            立即获取
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          有效期30秒,过期请点击重新获取
        </p>
      </div>

      {/* 友情提示 */}
      <div className="bg-yellow-50 p-4 rounded-md mb-6">
        <h3 className="text-yellow-800 font-medium mb-2">友情提示</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>1. 2FA验证码工具，如果出现验证码错误或者无效，请点击重新获取。</li>
          <li>2. 2FA验证器具有时效性，验证码在一定时间内会自动过期，需要更新获取。</li>
        </ul>
      </div>
    </div>
  );
};

export default TwoFactorAuth; 