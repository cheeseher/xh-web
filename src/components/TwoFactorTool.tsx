import React, { useState, useEffect } from 'react';
import * as OTPAuth from 'otpauth';

const TwoFactorTool: React.FC = () => {
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // 生成验证码
  const generateCode = () => {
    try {
      if (!secret) return;
      
      const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromBase32(secret),
        digits: 6,
        period: 30
      });
      setCode(totp.generate());
      setVerificationResult('有效期30秒,请期间点击重新获取');
    } catch (error) {
      setCode('');
      setVerificationResult('密钥格式错误，请输入正确的2FA密钥');
    }
  };

  // 复制验证码
  const copyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 更新倒计时
  useEffect(() => {
    if (!code) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = 30 - (now % 30);
      setTimeLeft(timeLeft);

      if (timeLeft === 30) {
        generateCode();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [code, secret]);

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-1">
            2FA密钥
          </label>
          <input
            type="text"
            id="secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value.toUpperCase())}
            placeholder="输入卡密中2FA代码"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            2FA验证码
          </label>
          <div className="flex">
            <input
              type="text"
              value={code}
              readOnly
              placeholder="有效期30秒,请期间点击重新获取"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              onClick={copyCode}
              className="px-4 py-2 bg-teal-600 text-white rounded-r-md hover:bg-teal-700 transition-colors"
            >
              {copied ? '已复制' : '点击复制'}
            </button>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={generateCode}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            立即获取
          </button>
        </div>
        
        {verificationResult && (
          <div className="bg-red-50 p-4 rounded-md">
            <h3 className="text-red-800 font-medium mb-2">友情提示</h3>
            <ol className="text-sm text-red-700 list-decimal list-inside space-y-1">
              <li>2FA验证码工具，如果出现验证码错误或者无效，请点击重新获取。</li>
              <li>2FA验证器具有时效性，验证码在一定时间内会自动过期，需要重新获取。</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFactorTool; 