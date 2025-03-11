import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useUser } from '../contexts/UserContext';

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState<'usdt' | 'other'>('usdt');

  // 模拟订单数据
  const orderData = {
    orderId: 'HENDUOHAOVIP264520311150124492',
    productName: '会员充值-1000.00',
    price: 1000,
    quantity: 1,
    total: 1000,
    email: '777777@qq.com',
    time: '2023-03-11 15:01:42'
  };

  // 处理支付方法选择
  const handlePaymentMethodChange = (method: 'usdt' | 'other') => {
    setPaymentMethod(method);
  };

  // 处理支付
  const handlePay = () => {
    if (paymentMethod === 'usdt') {
      router.push(`/user/payment/usdt?orderId=${orderData.orderId}&amount=${orderData.total}`);
    } else {
      alert('其他支付方式暂未开放');
    }
  };

  return (
    <Layout title="支付订单 - 星海账户">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">支付订单</h1>
        
        <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">订单ID</th>
                <th className="text-left py-2">商品名称</th>
                <th className="text-left py-2">单价</th>
                <th className="text-left py-2">数量</th>
                <th className="text-left py-2">金额</th>
                <th className="text-left py-2">邮箱</th>
                <th className="text-left py-2">时间</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3">{orderData.orderId}</td>
                <td className="py-3">{orderData.productName}</td>
                <td className="py-3">{orderData.price}</td>
                <td className="py-3">{orderData.quantity}</td>
                <td className="py-3">{orderData.total}</td>
                <td className="py-3">{orderData.email}</td>
                <td className="py-3">{orderData.time}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">选择支付方式</h2>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handlePaymentMethodChange('usdt')}
              className={`px-4 py-2 border ${
                paymentMethod === 'usdt' 
                  ? 'bg-gray-200 border-gray-400' 
                  : 'border-gray-300'
              } rounded-md`}
            >
              USDT 支付
            </button>
            <button
              onClick={() => handlePaymentMethodChange('other')}
              className={`px-4 py-2 border ${
                paymentMethod === 'other' 
                  ? 'bg-gray-200 border-gray-400' 
                  : 'border-gray-300'
              } rounded-md`}
            >
              其他支付
            </button>
          </div>
          
          <button
            onClick={handlePay}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            确认支付
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage; 