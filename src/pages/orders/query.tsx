import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FaSearch } from 'react-icons/fa';

const OrderQueryPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('请输入订单号');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // 模拟订单查询结果
    setTimeout(() => {
      setSearchResult({
        orderId: orderId,
        productName: '谷歌邮箱账号',
        price: 99.00,
        status: '已完成',
        createTime: '2024-03-10 15:30:45',
        payTime: '2024-03-10 15:31:22',
        account: 'example@gmail.com',
        password: '********',
      });
      setLoading(false);
    }, 800);
  };

  const handleRefreshVerificationCode = () => {
    // 模拟刷新验证码
    console.log('刷新验证码');
  };

  return (
    <Layout title="订单查询 - 星海账户" showAlert={false} hidePageTitle={true}>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">订单查询</h1>
        
        <div className="bg-white p-8 rounded-md shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                下单单号
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="请输入"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                查询邮箱
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                验证码
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="请输入"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div 
                  className="ml-2 w-24 h-10 bg-gray-200 flex items-center justify-center cursor-pointer"
                  onClick={handleRefreshVerificationCode}
                >
                  <img src="/images/captcha.png" alt="验证码" className="h-full" />
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="w-24 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                disabled={loading}
              >
                {loading ? '查询中...' : '查询'}
              </button>
              <p className="mt-2 text-sm text-red-500">
                查询不到订单？请检查输入信息是否正确
              </p>
            </div>
          </div>
        </div>
        
        {searchResult && (
          <div className="mt-8 bg-white p-6 rounded-md shadow-sm border border-gray-100">
            <h2 className="text-lg font-medium mb-4">订单详情</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">订单号</p>
                  <p className="font-medium">{searchResult.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">商品名称</p>
                  <p className="font-medium">{searchResult.productName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">订单金额</p>
                  <p className="font-medium text-primary">¥{searchResult.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">订单状态</p>
                  <p className="font-medium text-green-500">{searchResult.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">创建时间</p>
                  <p className="font-medium">{searchResult.createTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">支付时间</p>
                  <p className="font-medium">{searchResult.payTime}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderQueryPage; 