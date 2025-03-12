import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FaSearch, FaClipboard, FaInfoCircle, FaShoppingBag, FaCalendarAlt, FaClock } from 'react-icons/fa';

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
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">订单查询</h1>
          <p className="text-gray-600">查询您的订单信息和账号详情</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                订单号
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaClipboard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="请输入您的订单号"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                查询密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入查询密码"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                验证码
              </label>
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="请输入验证码"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div 
                  className="h-12 w-32 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
                  onClick={handleRefreshVerificationCode}
                >
                  <img src="/images/captcha.png" alt="验证码" className="h-full object-cover" />
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                disabled={loading}
              >
                <FaSearch className="mr-2" />
                {loading ? '查询中...' : '查询订单'}
              </button>
              <p className="mt-3 text-sm text-gray-500 flex items-center justify-center">
                <FaInfoCircle className="mr-1" />
                查询不到订单？请检查输入信息是否正确
              </p>
            </div>
          </form>
        </div>
        
        {searchResult && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center border-b border-gray-200 pb-4 mb-6">
              <FaShoppingBag className="text-gray-700 text-xl mr-3" />
              <h2 className="text-xl font-bold text-gray-800">订单详情</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">订单号</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaClipboard className="text-gray-400 mr-2" />
                    {searchResult.orderId}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">商品名称</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaShoppingBag className="text-gray-400 mr-2" />
                    {searchResult.productName}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">订单金额</p>
                  <p className="font-medium text-gray-800">¥{searchResult.price.toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">订单状态</p>
                  <p className="font-medium text-green-600">{searchResult.status}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">创建时间</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    {searchResult.createTime}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">支付时间</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaClock className="text-gray-400 mr-2" />
                    {searchResult.payTime}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-medium text-gray-800 mb-2">账号信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">账号</p>
                    <p className="font-medium text-gray-800">{searchResult.account}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">密码</p>
                    <p className="font-medium text-gray-800">{searchResult.password}</p>
                  </div>
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