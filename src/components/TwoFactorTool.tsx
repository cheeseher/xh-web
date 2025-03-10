import React, { useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';
import * as OTPAuth from 'otpauth';

const TwoFactorTool: React.FC = () => {
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  // 生成验证码
  const generateCode = () => {
    if (!secret) return;
    try {
      const totp = new OTPAuth.TOTP({
        secret: secret,
        digits: 6,
        period: 30
      });
      setCode(totp.generate());
    } catch (err) {
      setCode('');
    }
  };

  // 更新倒计时
  useEffect(() => {
    const now = new Date();
    const secondsPassed = now.getSeconds();
    const initialTimeLeft = 30 - (secondsPassed % 30);
    setTimeLeft(initialTimeLeft);

    const timer = setInterval(() => {
      const now = new Date();
      const secondsPassed = now.getSeconds();
      const newTimeLeft = 30 - (secondsPassed % 30);
      
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft === 30 || newTimeLeft === 0) {
        generateCode();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [secret]);

  // 生成验证码
  useEffect(() => {
    if (secret) {
      generateCode();
    }
  }, [secret]);

  // 复制验证码
  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-4">
      {/* 密钥输入 */}
      <div>
        <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-1">
          2FA验证码
        </label>
        <input
          type="text"
          id="secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value.toUpperCase())}
          placeholder="输入卡密中2FA代码"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* 验证码显示 */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">
            2FA验证码
          </label>
          <div className="text-gray-600 text-sm">
            有效期{timeLeft}秒,过期请点击重新获取
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          点击复制
        </button>
      </div>

      {/* 立即获取按钮 */}
      <button
        onClick={generateCode}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
      >
        立即获取
      </button>

      {/* 友情提示 */}
      <div className="bg-yellow-50 p-4 rounded-md">
        <h3 className="text-yellow-800 font-medium mb-2">友情提示</h3>
        <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
          <li>2FA验证码工具，如果出现验证码错误或者无效，请点击重新获取。</li>
          <li>2FA验证器具有时效性，验证码在一定时间内会自动过期，需要重新获取。</li>
        </ol>
      </div>
    </div>
  );
};

export default TwoFactorTool; 