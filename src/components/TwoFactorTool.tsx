import React, { useState } from 'react';
import * as OTPAuth from 'otpauth';

const TwoFactorTool: React.FC = () => {
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  // 生成新的密钥
  const generateNewSecret = () => {
    const newSecret = Array.from(crypto.getRandomValues(new Uint8Array(10)))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
    setSecret(newSecret);
    generateCode(newSecret);
  };

  // 生成验证码
  const generateCode = (currentSecret: string) => {
    try {
      const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromHex(currentSecret),
        digits: 6,
        period: 30
      });
      setCode(totp.generate());
    } catch (error) {
      setCode('');
    }
  };

  // 更新倒计时
  React.useEffect(() => {
    if (!secret) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = 30 - (now % 30);
      setTimeLeft(timeLeft);

      if (timeLeft === 30) {
        generateCode(secret);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secret]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">2FA验证码生成器</h2>
        <p className="text-gray-600">生成基于时间的一次性验证码(TOTP)</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={generateNewSecret}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          生成新密钥
        </button>

        {secret && (
          <div className="w-full max-w-md space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">密钥</div>
              <div className="font-mono text-lg break-all">{secret}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">验证码</div>
              <div className="font-mono text-3xl tracking-wider">{code}</div>
              <div className="text-sm text-gray-500 mt-2">
                {timeLeft}秒后更新
              </div>
            </div>
          </div>
        )}
      </div>

      {secret && (
        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-medium mb-2">使用说明：</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>此工具生成符合RFC 6238标准的TOTP验证码</li>
            <li>验证码每30秒更新一次</li>
            <li>请妥善保管密钥，不要分享给他人</li>
            <li>可用于各类需要2FA验证的平台</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TwoFactorTool; 