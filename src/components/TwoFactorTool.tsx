import React, { useState } from 'react';
import * as OTPAuth from 'otpauth';

const TwoFactorTool: React.FC = () => {
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // 生成验证码
  const generateCode = () => {
    try {
      if (!secret) return;
      
      const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromHex(secret),
        digits: 6,
        period: 30
      });
      setCode(totp.generate());
      setVerificationResult('有效期30秒,请确保验证码输入正确');
    } catch (error) {
      setCode('');
      setVerificationResult('密钥格式错误，请输入正确的2FA密钥');
    }
  };

  // 更新倒计时
  React.useEffect(() => {
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
  }, [code]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">2FA验证码</h2>
      
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
        
        {code && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              2FA验证码
            </label>
            <div className="text-gray-600 text-sm">
              有效期{timeLeft}秒，过期请点击重新获取
            </div>
            <div className="font-mono text-2xl mt-2">{code}</div>
          </div>
        )}
        
        <button
          onClick={generateCode}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          立即获取
        </button>
        
        {verificationResult && (
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-yellow-800 font-medium mb-2">友情提示</h3>
            <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
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