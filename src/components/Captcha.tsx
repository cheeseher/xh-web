import React, { useEffect, useRef } from 'react';

interface CaptchaProps {
  onRefresh?: () => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onRefresh }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置背景
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 生成随机验证码
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      captcha += char;
      
      // 绘制文字
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#333';
      ctx.textBaseline = 'middle';
      const x = 20 + i * 20;
      const y = canvas.height / 2;
      const rotation = (Math.random() - 0.5) * 0.3;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // 添加干扰线
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.strokeStyle = '#999';
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // 添加干扰点
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = '#999';
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleClick = () => {
    generateCaptcha();
    onRefresh?.();
  };

  return (
    <canvas
      ref={canvasRef}
      width={100}
      height={40}
      className="cursor-pointer"
      onClick={handleClick}
      title="点击刷新验证码"
    />
  );
};

export default Captcha; 