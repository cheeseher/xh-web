import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FaSearch, FaClipboard, FaInfoCircle, FaShoppingBag, FaCalendarAlt, FaClock, FaLock, FaShieldAlt } from 'react-icons/fa';

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
      <div className="max-w-3xl mx-auto py-10 px-2 sm:px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">订单查询</h1>
          <p className="text-gray-600">查询您的订单信息和账号详情</p>
        </div>
        
        {/* 通知提示区域 */}
        <div className="bg-[#009688]/10 border-l-4 border-[#009688] px-4 py-[10.5px] mb-6 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-[#009688]">
              <FaInfoCircle className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                欢迎使用订单查询系统，请输入您的订单号和查询密码进行查询。
              </p>
            </div>
          </div>
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
                  className="w-full pl-10 pr-4 h-[42px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                查询密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入查询密码"
                  className="w-full pl-10 pr-4 h-[42px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                验证码
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaShieldAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="请输入验证码"
                    className="w-full pl-10 pr-4 h-[42px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent"
                  />
                </div>
                <div 
                  className="w-32 h-[42px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                  onClick={handleRefreshVerificationCode}
                >
                  <span className="text-sm text-gray-500">点击刷新</span>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-[42px] flex items-center justify-center rounded-lg ${
                  loading ? 'bg-gray-400' : 'bg-[#009688] hover:bg-[#00796b]'
                } text-white transition-colors`}
              >
                {loading ? (
                  <span>查询中...</span>
                ) : (
                  <>
                    <FaSearch className="mr-2" />
                    <span>查询订单</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* 查询结果 */}
        {searchResult && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaShoppingBag className="mr-2 text-[#009688]" />
              订单详情
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    <FaClipboard className="mr-1" />
                    订单号
                  </div>
                  <div className="font-medium">{searchResult.orderId}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 mb-1">商品名称</div>
                  <div className="font-medium">{searchResult.productName}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    创建时间
                  </div>
                  <div className="font-medium">{searchResult.createTime}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    <FaClock className="mr-1" />
                    支付时间
                  </div>
                  <div className="font-medium">{searchResult.payTime}</div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">账号信息</h3>
                
                <div className="bg-gray-50 p-4 rounded-md mb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">账号</div>
                      <div className="font-medium">{searchResult.account}</div>
                    </div>
                    <button 
                      className="text-[#009688] hover:text-[#00796b] text-sm flex items-center"
                      onClick={() => navigator.clipboard.writeText(searchResult.account)}
                    >
                      <FaClipboard className="mr-1" />
                      复制
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">密码</div>
                      <div className="font-medium">{searchResult.password}</div>
                    </div>
                    <button 
                      className="text-[#009688] hover:text-[#00796b] text-sm flex items-center"
                      onClick={() => navigator.clipboard.writeText('实际密码会在这里显示')}
                    >
                      <FaClipboard className="mr-1" />
                      复制
                    </button>
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