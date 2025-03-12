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
      if (!secret) {
        setVerificationResult('请输入2FA密钥');
        return;
      }
      
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
    <div className="space-y-6">
      {/* 密钥输入区域 */}
      <div className="space-y-4">
        <div>
          <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-2">
            2FA密钥
          </label>
          <input
            type="text"
            id="secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value.toUpperCase())}
            placeholder="输入卡密中2FA代码"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all"
          />
          <p className="mt-1 text-xs text-gray-500">输入您的2FA密钥，通常是一串字母和数字的组合</p>
        </div>
        
        {/* 验证码显示区域 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2FA验证码
          </label>
          <div className="flex">
            <div className="relative flex-1">
              <input
                type="text"
                value={code}
                readOnly
                placeholder="点击下方按钮获取验证码"
                className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none bg-gray-50 font-mono text-lg text-center tracking-widest"
              />
              {code && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <div className="bg-[#009688] text-white text-xs rounded-full px-2 py-1">
                    {timeLeft}s
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={copyCode}
              disabled={!code}
              className={`px-4 py-3 ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : code 
                    ? 'bg-[#009688] text-white hover:bg-[#00796b]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } rounded-r-lg transition-all min-w-[100px]`}
            >
              {copied ? '已复制' : '复制'}
            </button>
          </div>
        </div>
        
        {/* 操作按钮 */}
        <div className="pt-2">
          <button
            onClick={generateCode}
            className="w-full px-6 py-3 bg-[#009688] text-white rounded-lg hover:bg-[#00796b] transition-all"
          >
            {code ? '重新获取' : '立即获取'}
          </button>
        </div>
      </div>
      
      {/* 提示信息 */}
      <div className="bg-[#009688]/5 border border-[#009688]/20 rounded-lg p-4">
        <h3 className="text-gray-800 font-medium mb-2">使用提示</h3>
        <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
          <li>2FA验证码每30秒自动更新一次，请在有效期内使用</li>
          <li>如果验证失败，请检查密钥是否正确，或尝试重新获取验证码</li>
          <li>验证码使用标准TOTP协议生成，与Google Authenticator等应用兼容</li>
          {verificationResult && verificationResult !== '有效期30秒,请期间点击重新获取' && (
            <li className="text-red-500">{verificationResult}</li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default TwoFactorTool; 