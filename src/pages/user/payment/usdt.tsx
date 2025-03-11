import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useUser } from '../../../contexts/UserContext';
import Image from 'next/image';

const UsdtPaymentPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [remainingTime, setRemainingTime] = useState(900); // 15分钟倒计时

  const { orderId, amount } = router.query;
  const usdtAmount = amount ? (Number(amount) / 7).toFixed(2) : '0.00'; // 模拟汇率转换
  const usdtAddress = 'TYQraQ5JJXKyVD6LTBuBHmDXCYHTQTiwA3';
  const paymentId = '202503101741607286955837';
  const platformOrderId = 'XINGHAIVIP26652031019484906';

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')} : ${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
  };

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <Layout title="USDT支付 - 账户商城">
      <div className="max-w-md mx-auto bg-white p-4 mt-8">
        <div className="flex flex-col items-center">
          {/* USDT Logo */}
          <div className="mb-4">
            <Image
              src="/images/usdt-logo.png"
              alt="USDT"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>

          {/* 星海账户服务平台 */}
          <h1 className="text-lg font-bold mb-4">星海账户服务平台</h1>

          {/* 支付编号和平台订单号 */}
          <div className="w-full text-sm mb-4">
            <div>支付编号：{paymentId}</div>
            <div>平台订单号：</div>
            <div>{platformOrderId}</div>
          </div>

          {/* 当前USDT支付区块网络协议为TRC20 */}
          <div className="text-sm text-gray-600 mb-4">
            当前USDT支付区块网络协议为TRC20
          </div>

          {/* 订单支付完成后提示 */}
          <div className="text-sm text-red-500 mb-4">
            订单支付完成后，会自动跳转至
            <a href="/order" className="text-blue-500">订单页面</a>
          </div>

          {/* 警告提示 */}
          <div className="text-sm text-red-500 font-bold mb-4 text-center">
            ！到账金额需要与下方显示的金额一致，否则系统
            <br />
            无法确认！
          </div>

          {/* 尝试点击钱包地址可直接复制 */}
          <div className="text-sm text-yellow-500 mb-4">
            尝试点击钱包地址可直接复制👇
          </div>

          {/* USDT金额 */}
          <div className="text-3xl font-bold text-[#26A17B] mb-4">
            {usdtAmount} <span className="text-sm">USDT</span>
          </div>

          {/* USDT地址 */}
          <div className="w-full mb-4">
            <div 
              className="text-sm text-gray-600 text-center cursor-pointer"
              onClick={() => handleCopy(usdtAddress)}
            >
              {usdtAddress}
            </div>
          </div>

          {/* 二维码 */}
          <div className="mb-4">
            <Image
              src="/images/usdt-qrcode.png"
              alt="USDT QR Code"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>

          {/* 倒计时 */}
          <div className="text-xl font-mono">
            {formatTime(remainingTime)}
          </div>
          <div className="text-sm text-gray-500">
            时 分 秒
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsdtPaymentPage; 