import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useUser } from '../../../contexts/UserContext';
import Image from 'next/image';
import { FaCopy, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

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
    <Layout title="USDT支付 - 星海账户">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-200">
        <div className="flex flex-col items-center">
          {/* 头部信息 */}
          <div className="w-full flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="bg-[#26A17B] p-2 rounded-full mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12.88 15.76V16.88H11.12V15.73C10.14 15.59 9.33 15.15 8.81 14.39L9.94 13.26C10.31 13.75 10.97 14.11 11.78 14.11C12.65 14.11 13.01 13.78 13.01 13.3C13.01 12.2 11.12 12.32 9.92 11.18C9.36 10.67 9.06 10.02 9.06 9.28C9.06 8.08 9.96 7.05 11.12 6.81V5.72H12.88V6.83C13.69 7.01 14.32 7.44 14.77 8.09L13.64 9.21C13.34 8.8 12.79 8.46 12.08 8.46C11.33 8.46 10.95 8.86 10.95 9.28C10.95 10.32 12.88 10.23 14.07 11.34C14.62 11.85 14.93 12.52 14.93 13.3C14.93 14.5 14.05 15.54 12.88 15.76Z" fill="white"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold">USDT支付</h1>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <FaClock className="text-gray-500 mr-2" />
              <span className="text-sm font-medium">{formatTime(remainingTime)}</span>
            </div>
          </div>

          {/* 订单信息 */}
          <div className="w-full bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">支付编号</span>
              <span className="text-sm font-medium">{paymentId}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">平台订单号</span>
              <span className="text-sm font-medium truncate max-w-[200px]">{platformOrderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">网络协议</span>
              <span className="text-sm font-medium">TRC20</span>
            </div>
          </div>

          {/* 警告提示 */}
          <div className="w-full bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-600 font-medium">重要提示</p>
                <p className="text-sm text-red-500">
                  到账金额需要与下方显示的金额一致，否则系统无法确认！
                  订单支付完成后，会自动跳转至<a href="/order" className="text-blue-500 underline">订单页面</a>
                </p>
              </div>
            </div>
          </div>

          {/* USDT金额 */}
          <div className="w-full bg-[#26A17B]/10 rounded-lg p-6 mb-6 text-center">
            <p className="text-sm text-gray-500 mb-2">请支付金额</p>
            <div className="text-4xl font-bold text-[#26A17B] mb-1">
              {usdtAmount} <span className="text-lg">USDT</span>
            </div>
            <p className="text-sm text-gray-500">≈ ¥{amount} CNY</p>
          </div>

          {/* USDT地址 */}
          <div className="w-full mb-6">
            <p className="text-sm text-gray-500 mb-2 text-center">收款钱包地址 (点击复制)</p>
            <div 
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg cursor-pointer border border-gray-200 hover:bg-gray-100 transition-colors"
              onClick={() => handleCopy(usdtAddress)}
            >
              <span className="text-sm font-mono text-gray-700 mr-2">{usdtAddress}</span>
              {copied ? (
                <FaCheckCircle className="text-green-500 flex-shrink-0" />
              ) : (
                <FaCopy className="text-gray-400 flex-shrink-0" />
              )}
            </div>
            {copied && (
              <p className="text-xs text-green-500 mt-1 text-center">已复制到剪贴板</p>
            )}
          </div>

          {/* 二维码 */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white">
            <div className="bg-white p-2 rounded-lg flex justify-center">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <rect width="200" height="200" fill="white" />
                <path d="M40 40H60V60H40V40Z" fill="black" />
                <path d="M60 40H80V60H60V40Z" fill="black" />
                <path d="M80 40H100V60H80V40Z" fill="black" />
                <path d="M40 60H60V80H40V60Z" fill="black" />
                <path d="M80 60H100V80H80V60Z" fill="black" />
                <path d="M40 80H60V100H40V80Z" fill="black" />
                <path d="M60 80H80V100H60V80Z" fill="black" />
                <path d="M80 80H100V100H80V80Z" fill="black" />
                <path d="M120 40H140V60H120V40Z" fill="black" />
                <path d="M140 40H160V60H140V40Z" fill="black" />
                <path d="M120 60H140V80H120V60Z" fill="black" />
                <path d="M120 80H140V100H120V80Z" fill="black" />
                <path d="M140 80H160V100H140V80Z" fill="black" />
                <path d="M40 120H60V140H40V120Z" fill="black" />
                <path d="M60 120H80V140H60V120Z" fill="black" />
                <path d="M80 120H100V140H80V120Z" fill="black" />
                <path d="M40 140H60V160H40V140Z" fill="black" />
                <path d="M80 140H100V160H80V140Z" fill="black" />
                <path d="M120 120H140V140H120V120Z" fill="black" />
                <path d="M140 140H160V160H140V140Z" fill="black" />
                <path d="M60 100H80V120H60V100Z" fill="black" />
                <path d="M100 60H120V80H100V60Z" fill="black" />
                <path d="M100 100H120V120H100V100Z" fill="black" />
                <path d="M100 140H120V160H100V140Z" fill="black" />
                <path d="M120 100H140V120H120V100Z" fill="black" />
                <path d="M140 100H160V120H140V100Z" fill="black" />
                <path d="M140 120H160V140H140V120Z" fill="black" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">扫描二维码支付</p>
          </div>

          {/* 底部提示 */}
          <div className="text-xs text-gray-500 text-center">
            <p>星海账户服务平台 - 安全支付保障</p>
            <p className="mt-1">如有问题请联系客服</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsdtPaymentPage; 