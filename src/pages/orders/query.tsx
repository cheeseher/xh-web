import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { FaSearch, FaClipboard, FaInfoCircle, FaShoppingBag, FaCalendarAlt, FaClock, FaLock, FaShieldAlt, FaChevronLeft, FaChevronRight, FaEnvelope, FaCheck, FaSpinner } from 'react-icons/fa';

interface Account {
  account: string;
  password: string;
  backupEmail: string;
}

interface SearchResult {
  orderId: string;
  productName: string;
  price: number;
  quantity: number;
  status: string;
  createTime: string;
  payTime: string;
  accounts: Account[];
}

const OrderQueryPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [queryPassword, setQueryPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentVerificationCode, setCurrentVerificationCode] = useState('1111');
  const pageSize = 10; // 每页显示的卡密数量

  // 预设的邮箱和密码
  const PRESET_EMAIL = '111@qq.com';
  const PRESET_PASSWORD = '11111111';
  const PRESET_VERIFICATION_CODE = '1111';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 首先校验验证码
    if (verificationCode !== PRESET_VERIFICATION_CODE) {
      setError('验证码错误');
      return;
    }
    
    if (!email.trim()) {
      setError('请输入邮箱');
      return;
    }
    
    setLoading(true);
    setError('');
    setCurrentPage(1); // 重置页码
    
    // 延迟模拟网络请求
    setTimeout(() => {
      // 检查邮箱和密码
      if (email !== PRESET_EMAIL) {
        setError('未查询到该订单号');
        setLoading(false);
        return;
      }
      
      if (queryPassword !== PRESET_PASSWORD) {
        setError('订单号或查询密码错误，请检查后重试');
        setLoading(false);
        return;
      }
      
      // 邮箱和密码都正确，返回查询结果
      // 生成更多的测试数据
      const accounts = [];
      for (let i = 1; i <= 25; i++) {
        accounts.push({
          account: `example${i}@gmail.com`,
          password: '********',
          backupEmail: `backup${i}@example.com`
        });
      }
      
      setSearchResult({
        orderId: 'ORD' + Math.floor(Math.random() * 10000000),
        productName: '谷歌邮箱账号',
        price: 99.00,
        quantity: accounts.length,
        status: '已完成',
        createTime: '2024-03-10 15:30:45',
        payTime: '2024-03-10 15:31:22',
        accounts: accounts
      });
      setLoading(false);
    }, 800);
  };

  const handleRefreshVerificationCode = () => {
    // 模拟刷新验证码 - 始终重置为预设的验证码
    setCurrentVerificationCode(PRESET_VERIFICATION_CODE);
    console.log('刷新验证码');
  };

  // 页面加载时自动设置验证码
  useEffect(() => {
    handleRefreshVerificationCode();
  }, []);

  // 计算总页数
  const totalPages = searchResult ? Math.ceil(searchResult.accounts.length / pageSize) : 0;
  
  // 获取当前页的卡密数据
  const getCurrentPageData = () => {
    if (!searchResult) return [];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, searchResult.accounts.length);
    return searchResult.accounts.slice(startIndex, endIndex);
  };

  // 处理页码变化
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // 最多显示的页码数量
    
    if (totalPages <= maxVisiblePages) {
      // 如果总页数小于等于最大显示数，则显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 否则，显示当前页附近的页码
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  // 处理复制操作
  const handleCopyAll = () => {
    const accountsText = searchResult?.accounts
      .map(acc => `${acc.account}----${acc.password}----${acc.backupEmail} 格式：账号----密码----辅助邮箱（用于登录确认输入）`)
      .join('\n') || '';
    
    navigator.clipboard.writeText(accountsText);
    setCopySuccess(true);
    
    // 1秒后恢复按钮状态
    setTimeout(() => {
      setCopySuccess(false);
    }, 1000);
  };

  return (
    <Layout title="订单查询 - 星海账户" showAlert={false} hidePageTitle={true}>
      <div className="max-w-6xl mx-auto py-2 sm:py-4 px-2 sm:px-4">
        <h1 className="text-2xl font-bold mb-3 sm:mb-4">订单查询</h1>
        
        {/* 主内容区域 - 移动端无背景卡片，桌面端有背景卡片 */}
        <div className="lg:bg-white lg:rounded-lg lg:shadow-sm lg:p-6 lg:mt-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* 左侧查询表单 */}
            <div className="lg:w-[480px] flex-shrink-0">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 lg:h-full">
                <div className="bg-[#009688]/10 border-l-4 border-[#009688] px-3 sm:px-4 py-2 sm:py-[10.5px] mb-4 sm:mb-6 rounded-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-[#009688]">
                      <FaInfoCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs sm:text-sm text-gray-700">
                        欢迎使用订单查询系统，请输入您的邮箱和查询密码进行查询。
                      </p>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      邮箱
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="请输入您的邮箱"
                        className="w-full pl-10 pr-4 h-[42px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="queryPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      查询密码
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="queryPassword"
                        value={queryPassword}
                        onChange={(e) => setQueryPassword(e.target.value)}
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
                        <span className="text-sm text-gray-500">{currentVerificationCode}</span>
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
                        loading ? 'bg-[#009688]/80' : 'bg-[#009688] hover:bg-[#00796b]'
                      } text-white transition-colors`}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          <span>查询中...</span>
                        </>
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
            </div>

            {/* 右侧订单详情 */}
            {searchResult && (
              <div className="flex-1">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                      <FaShoppingBag className="mr-2 text-[#009688]" />
                      订单详情
                    </h2>
                    <button 
                      onClick={() => {
                        setSearchResult(null);
                        setEmail('');
                        setQueryPassword('');
                        setVerificationCode('');
                      }}
                      className="text-[#009688] hover:text-[#00796b] text-xs sm:text-sm border border-[#009688] px-2 sm:px-3 py-1 rounded-md transition-colors"
                    >
                      重新查询
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 py-3 sm:py-4 mb-2 sm:mb-4">
                    <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3">
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-gray-500 text-xs sm:text-sm">订单号：</span>
                        <span className="font-medium text-[#009688] ml-1 text-xs sm:text-sm">{searchResult.orderId}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-gray-500 text-xs sm:text-sm">商品名称：</span>
                        <span className="font-medium text-[#009688] ml-1 text-xs sm:text-sm">{searchResult.productName}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-gray-500 text-xs sm:text-sm">商品单价：</span>
                        <span className="font-medium text-[#009688] ml-1 text-xs sm:text-sm">¥{searchResult.price.toFixed(2)}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-gray-500 text-xs sm:text-sm">数量：</span>
                        <span className="font-medium text-[#009688] ml-1 text-xs sm:text-sm">{searchResult.quantity}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-gray-500 text-xs sm:text-sm">订单总额：</span>
                        <span className="font-medium text-[#009688] ml-1 text-xs sm:text-sm">¥{(searchResult.price * searchResult.quantity).toFixed(2)}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-gray-500 text-xs sm:text-sm">订单状态：</span>
                        <span className="font-medium text-[#009688] ml-1 text-xs sm:text-sm">{searchResult.status}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500 text-xs sm:text-sm">下单时间：</span>
                        <span className="font-medium ml-1 text-xs sm:text-sm">{searchResult.createTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 账号信息区域 - 独立于订单详情 */}
          {searchResult && (
            <div className="mt-4 sm:mt-6">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800">账号信息</h3>
                  <button 
                    className="text-[#009688] hover:text-[#00796b] text-xs sm:text-sm flex items-center transition-all duration-200"
                    onClick={handleCopyAll}
                  >
                    {copySuccess ? (
                      <>
                        <FaCheck className="mr-1" />
                        <span>复制成功</span>
                      </>
                    ) : (
                      <>
                        <FaClipboard className="mr-1" />
                        <span>复制全部</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-2 sm:px-4 py-2 w-12 sm:w-16">序号</th>
                        <th className="px-2 sm:px-4 py-2">卡密信息</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getCurrentPageData().map((acc, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                            {(currentPage - 1) * pageSize + index + 1}
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3">
                            <div className="font-medium break-all text-xs sm:text-sm">
                              {acc.account}----{acc.password}----{acc.backupEmail} 格式：账号----密码----辅助邮箱（用于登录确认输入）
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Element风格的分页器 */}
                {totalPages > 1 && (
                  <div className="flex justify-end items-center mt-3 sm:mt-4 text-xs sm:text-sm">
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 sm:px-3 py-1 flex items-center ${
                          currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <FaChevronLeft className="h-2 w-2 sm:h-3 sm:w-3" />
                      </button>
                      
                      {getPageNumbers().map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-2 sm:px-3 py-1 ${
                            currentPage === page 
                              ? 'bg-[#009688] text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 sm:px-3 py-1 flex items-center ${
                          currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <FaChevronRight className="h-2 w-2 sm:h-3 sm:w-3" />
                      </button>
                    </div>
                    <span className="ml-2 text-gray-500 text-xs sm:text-sm">
                      共 {searchResult.accounts.length} 条，{totalPages} 页
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrderQueryPage;