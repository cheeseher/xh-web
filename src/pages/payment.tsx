import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useUser } from '../contexts/UserContext';
import { FaShoppingCart, FaMoneyBillWave, FaWallet, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const { orderId, productId, quantity, email } = router.query;
  const { user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState<'usdt' | 'other'>('usdt');
  const [orderData, setOrderData] = useState({
    orderId: '',
    productName: '',
    price: 0,
    quantity: 1,
    total: 0,
    email: '',
    time: ''
  });

  // 初始化订单数据
  useEffect(() => {
    if (router.isReady) {
      // 模拟从后端获取商品信息
      const productInfo = getProductInfo(productId as string);
      
      // 计算订单总价
      const qty = parseInt(quantity as string) || 1;
      const total = productInfo.price * qty;
      
      // 设置订单数据
      setOrderData({
        orderId: orderId as string || `ORDER${Date.now()}`,
        productName: productInfo.name,
        price: productInfo.price,
        quantity: qty,
        total: total,
        email: (email as string) || (user?.email || ''),
        time: new Date().toLocaleString()
      });
    }
  }, [router.isReady, orderId, productId, quantity, email, user]);

  // 模拟获取商品信息
  const getProductInfo = (id: string) => {
    // 这里应该是从API获取商品信息，这里简单模拟
    const products: Record<string, {name: string, price: number}> = {
      'gmail-1': { name: 'Gmail邮箱-稳定可用（手工）', price: 4.20 },
      'outlook-1': { name: 'Outlook邮箱-稳定可用', price: 3.50 },
      'instagram-1': { name: 'Instagram账号-纯手工', price: 8.80 },
      'default': { name: '未知商品', price: 10.00 }
    };
    
    return products[id] || products['default'];
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
    <Layout title="支付订单 - 星海账户" hidePageTitle={true}>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* 页面标题 */}
        <div className="flex items-center mb-8">
          <div className="bg-primary p-2 rounded-full mr-3">
            <FaShoppingCart className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">订单支付</h1>
        </div>
        
        {/* 订单信息卡片 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-semibold flex items-center">
              <FaInfoCircle className="text-gray-500 mr-2" />
              订单详情
            </h2>
            <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              待支付
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500 w-1/4">订单ID</td>
                  <td className="py-3 font-medium">{orderData.orderId}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500">商品名称</td>
                  <td className="py-3 font-medium">{orderData.productName}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500">单价</td>
                  <td className="py-3 font-medium">¥{orderData.price.toFixed(2)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500">数量</td>
                  <td className="py-3 font-medium">{orderData.quantity}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500">邮箱</td>
                  <td className="py-3 font-medium">{orderData.email}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-500">下单时间</td>
                  <td className="py-3 font-medium">{orderData.time}</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-500">应付金额</td>
                  <td className="py-3 text-xl font-bold text-primary">¥{orderData.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 支付方式选择卡片 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold flex items-center mb-6">
            <FaMoneyBillWave className="text-gray-500 mr-2" />
            选择支付方式
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div 
              onClick={() => handlePaymentMethodChange('usdt')}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                paymentMethod === 'usdt' 
                  ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                paymentMethod === 'usdt' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                <FaWallet />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">USDT 支付</h3>
                <p className="text-sm text-gray-500">使用USDT加密货币支付</p>
              </div>
              {paymentMethod === 'usdt' && (
                <FaCheckCircle className="text-primary ml-2" />
              )}
            </div>
            
            <div 
              onClick={() => handlePaymentMethodChange('other')}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                paymentMethod === 'other' 
                  ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                paymentMethod === 'other' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                <FaMoneyBillWave />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">其他支付方式</h3>
                <p className="text-sm text-gray-500">更多支付选项</p>
              </div>
              {paymentMethod === 'other' && (
                <FaCheckCircle className="text-primary ml-2" />
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="text-gray-500">
              总计: <span className="text-xl font-bold text-primary ml-2">¥{orderData.total.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePay}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center"
            >
              <FaWallet className="mr-2" />
              确认支付
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage; 