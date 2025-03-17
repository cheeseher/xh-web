import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUser, FaKey, FaShoppingBag, FaWallet, FaFileInvoiceDollar, FaEdit, FaLock, FaHistory, FaEye, FaUndo, FaTimes, FaCopy, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import Layout from './Layout';
import { useUser } from '../contexts/UserContext';
import Link from 'next/link';
import toast from 'react-hot-toast';

// 创建一个简单的加载组件
const LoadingComponent = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009688]"></div>
  </div>
);

// 新增我的信息组件
const InfoContent = () => {
  // 模拟用户账户信息
  const userAccount = {
    balance: 350.00,
    username: 'user123',
    email: 'user@example.com',
    totalRecharge: 300.00,
    vipLevel: 1
  };

  // 计算VIP等级进度
  const calculateVipProgress = () => {
    // VIP等级阈值
    const vipThresholds = [0, 500, 2000];
    
    // 当前VIP等级
    const currentVipLevel = userAccount.vipLevel;
    
    // 如果已经是最高等级
    if (currentVipLevel >= vipThresholds.length - 1) {
      return {
        progress: 100,
        nextLevelDiff: 0,
        isMaxLevel: true
      };
    }
    
    // 设置固定的假进度值（60%）
    return {
      progress: 60,
      nextLevelDiff: 200,
      isMaxLevel: false
    };
  };
  
  const vipProgress = calculateVipProgress();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">我的信息</h2>
        <p className="text-sm text-gray-500">查看您的账户和余额信息</p>
      </div>
      
      {/* 账户信息卡片 - 与充值页面保持一致 */}
      <div className="bg-white sm:p-6 p-3 sm:rounded-xl sm:shadow-sm sm:border sm:border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 账号信息 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaUser className="text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">账号信息</h2>
            </div>
            <div className="bg-transparent sm:bg-gray-50 p-2 sm:p-4 rounded-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-sm text-gray-500 mb-1 sm:mb-0">账户昵称</span>
                <span className="font-medium text-gray-900">{userAccount.username}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-sm text-gray-500 mb-1 sm:mb-0">账户邮箱</span>
                <span className="font-medium text-gray-900 break-all">{userAccount.email}</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="text-sm text-gray-500">会员等级</span>
                <div className="flex justify-end">
                  <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 rounded text-sm font-medium">
                    VIP{userAccount.vipLevel}
                  </span>
                </div>
              </div>
              
              {/* VIP等级进度条 */}
              {!vipProgress.isMaxLevel ? (
                <div className="mt-2">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                    <span>VIP{userAccount.vipLevel}</span>
                    <span>VIP{userAccount.vipLevel + 1}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-yellow-500 h-2.5 rounded-full" 
                        style={{ width: `${vipProgress.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">还差{vipProgress.nextLevelDiff}元升级</span>
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-right">
                  <span className="text-xs text-gray-500">已达最高等级</span>
                </div>
              )}
            </div>
          </div>

          {/* 余额信息 */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <FaWallet className="text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">余额信息</h2>
            </div>
            <div className="bg-transparent sm:bg-gray-50 p-2 sm:p-4 rounded-lg space-y-4 flex-grow">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">当前余额</span>
                <span className="font-medium text-2xl text-primary">{userAccount.balance} 元</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">累计充值</span>
                <span className="font-medium text-gray-900">{userAccount.totalRecharge} 元</span>
              </div>
            </div>
            
            {/* 充值按钮 - 移到卡片下方 */}
            <div className="mt-4 flex justify-end">
              <Link 
                href="/user/recharge" 
                className="flex items-center justify-center h-[40px] w-24 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors"
              >
                充值
              </Link>
            </div>
          </div>
        </div>
        
        {/* 折扣提示信息 */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="bg-[#f8f9fa] rounded-md p-3">
            <p className="text-sm text-gray-700">
              <span className="text-[#009688] font-medium">当前任意购买商品9.5折</span>
              <span className="mx-2 text-gray-400">|</span>
              <span>累计充值500元享受9.5折优惠，优先客服支持</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 修改个人资料组件，移除背景和多余间距
const ProfileContent = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    username: 'user123',
    email: 'user@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // 3秒后重置成功状态
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // 验证密码
    if (formData.newPassword !== formData.confirmPassword) {
      setSubmitError('新密码和确认密码不匹配');
      setIsSubmitting(false);
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setSubmitError('密码长度至少为6个字符');
      setIsSubmitting(false);
      return;
    }
    
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // 重置表单
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // 3秒后重置成功状态
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">个人资料</h2>
        <p className="text-sm text-gray-500">管理您的个人信息和账户安全</p>
      </div>
      
      {/* 标签栏 */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('profile')}
        >
          基本信息
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'password' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('password')}
        >
          修改密码
        </button>
      </div>
      
      {activeTab === 'profile' ? (
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              昵称
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="max-w-md w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
              placeholder="请输入您的昵称"
            />
            <p className="mt-1 text-xs text-gray-500">昵称长度2-20个字符，支持中英文、数字和下划线</p>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="max-w-md w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
              placeholder="user@example.com"
            />
            <p className="mt-1 text-xs text-gray-500">邮箱不可修改</p>
          </div>
          
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              {isSubmitting ? '保存中...' : '保存修改'}
            </button>
          </div>
          
          {submitSuccess && (
            <div className="p-3 bg-green-50 text-green-700 rounded-md">
              个人资料已成功更新
            </div>
          )}
          
          {submitError && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md">
              {submitError}
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              当前密码
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="max-w-md w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
              placeholder="请输入当前密码"
            />
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              新密码
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="max-w-md w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
              placeholder="请输入新密码（至少6个字符）"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              确认新密码
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="max-w-md w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
              placeholder="请再次输入新密码"
            />
          </div>
          
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              {isSubmitting ? '保存中...' : '修改密码'}
            </button>
          </div>
          
          {submitSuccess && (
            <div className="p-3 bg-green-50 text-green-700 rounded-md">
              密码已成功修改
            </div>
          )}
          
          {submitError && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md">
              {submitError}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

// 内联组件：订单记录
const OrderContent = () => {
  // 模拟订单记录数据
  const mockOrderRecords = [
    {
      orderNumber: 'ORD202403210001',
      productName: 'Gmail账号',
      unitPrice: 50,
      quantity: 1,
      totalAmount: 50,
      orderTime: '2024-03-21 15:30:00',
      status: 'success',
      email: 'user@example.com',
      password: '123456',
      cardInfo: 'gmail123@gmail.com----Password123----backup@example.com'
    },
    {
      orderNumber: 'ORD202403210002',
      productName: 'Outlook账号',
      unitPrice: 45,
      quantity: 2,
      totalAmount: 90,
      orderTime: '2024-03-21 16:45:00',
      status: 'pending',
      email: 'user2@example.com',
      password: '654321',
      cardInfo: 'outlook123@outlook.com----Password456----backup2@example.com'
    },
    {
      orderNumber: 'ORD202403210003',
      productName: 'Instagram账号',
      unitPrice: 80,
      quantity: 1,
      totalAmount: 80,
      orderTime: '2024-03-21 18:20:00',
      status: 'failed',
      email: 'user3@example.com',
      password: 'abcdef',
      cardInfo: 'instagram123@gmail.com----Password789----backup3@example.com'
    }
  ];

  const [orders, setOrders] = useState(mockOrderRecords);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // 计算总页数
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  
  // 获取当前页的数据
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return orders.slice(startIndex, endIndex);
  };
  
  // 页码变化处理函数
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return '成功';
      case 'pending':
        return '处理中';
      case 'failed':
        return '失败';
      default:
        return '未知';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewOrder = (orderNumber: string) => {
    const order = mockOrderRecords.find(order => order.orderNumber === orderNumber);
    if (order && order.status === 'success') {
      setCurrentOrder(order);
      setShowOrderModal(true);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess('复制成功!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('复制失败: ', err);
      });
  };

  // 渲染分页器
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-6">
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            上一页
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-[#009688] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            下一页
          </button>
        </nav>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">订单记录</h2>
        <p className="text-sm text-gray-500">查看您的所有购买订单</p>
      </div>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      {orders.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    订单号
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    商品名
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    单价
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    数量
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金额
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    下单时间
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentPageData().map((order) => (
                  <tr key={order.orderNumber} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ¥{order.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#009688]">
                      ¥{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex items-center justify-center text-xs font-medium rounded-full ${getStatusStyle(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-4">
                        {order.status === 'success' && (
                          <button
                            onClick={() => handleViewOrder(order.orderNumber)}
                            className="px-3 py-1 bg-[#009688]/10 text-[#009688] hover:bg-[#009688]/20 rounded-md transition-colors"
                            title="查看"
                          >
                            查看
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 分页器 */}
          {renderPagination()}
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaShoppingBag className="mx-auto text-5xl text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">暂无订单记录</p>
        </div>
      )}
      
      {/* 订单详情弹窗 */}
      {showOrderModal && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-medium">订单详情</h3>
              <button 
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-end mb-2">
                  <button 
                    onClick={() => handleCopyText(currentOrder.cardInfo)}
                    className="flex items-center text-sm text-[#009688] hover:text-[#00796b]"
                    title="复制"
                  >
                    <FaCopy className="mr-1" />
                    复制
                  </button>
                  {copySuccess && (
                    <div className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {copySuccess}
                    </div>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-2 w-16">序号</th>
                        <th className="px-4 py-2">卡密信息</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          1
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium break-all text-sm">
                            {currentOrder.cardInfo} 格式：账号----密码----辅助邮箱（用于登录确认输入）
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Element UI 风格的分页器 */}
                <div className="flex justify-end items-center mt-4">
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button 
                      className="px-3 py-1 flex items-center text-gray-700 hover:bg-gray-100 border-r border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                      disabled={true}
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      className="px-3 py-1 bg-[#009688] text-white"
                    >
                      1
                    </button>
                    
                    <button 
                      className="px-3 py-1 flex items-center text-gray-700 hover:bg-gray-100 border-l border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                      disabled={true}
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <span className="ml-2 text-gray-500 text-xs">
                    共 1 条，1 页
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 修改充值记录组件，移除卡片背景并添加表格边框
const RechargeContent = () => {
  const [mockRechargeRecords, setMockRechargeRecords] = useState([
    { id: 'R20230501001', amount: 100, status: 'success', time: '2023-05-01 10:30:45', paymentMethod: 'USDT' },
    { id: 'R20230425002', amount: 200, status: 'success', time: '2023-04-25 15:22:18', paymentMethod: 'USDT' },
    { id: 'R20230410003', amount: 50, status: 'success', time: '2023-04-10 09:15:33', paymentMethod: 'USDT' },
    { id: 'R20230401004', amount: 300, status: 'pending', time: '2023-04-01 14:05:27', paymentMethod: 'USDT' },
    { id: 'R20230320005', amount: 150, status: 'failed', time: '2023-03-20 11:45:52', paymentMethod: 'USDT' }
  ]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return '成功';
      case 'pending':
        return '处理中';
      case 'failed':
        return '失败';
      default:
        return '未知';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">充值记录</h2>
        <p className="text-sm text-gray-500">查看您的所有充值记录</p>
      </div>
      
      {mockRechargeRecords.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  订单号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  支付方式
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  时间
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRechargeRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="mr-2">{record.id}</span>
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaCopy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ¥{record.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1.5 inline-flex items-center justify-center text-xs font-medium rounded-full ${getStatusStyle(record.status)}`}>
                      {getStatusText(record.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaWallet className="mx-auto text-5xl text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">暂无充值记录</p>
        </div>
      )}
    </div>
  );
};

// 内联组件：账单记录
const BillContent = () => {
  // 模拟账单记录数据
  const mockBillRecords = [
    {
      id: 'BL202403210001',
      type: 'recharge',
      amount: 100,
      balance: 100,
      relatedOrder: 'RC202403210001',
      remark: 'USDT充值',
      time: '2024-03-21 15:30:00'
    },
    {
      id: 'BL202403210002',
      type: 'consume',
      amount: -50,
      balance: 50,
      relatedOrder: 'ORD202403210001',
      remark: '购买Gmail账号',
      time: '2024-03-21 16:45:00'
    },
    {
      id: 'BL202403210003',
      type: 'recharge',
      amount: 200,
      balance: 250,
      relatedOrder: 'RC202403210002',
      remark: 'USDT充值',
      time: '2024-03-21 18:20:00'
    }
  ];

  const handleViewRelatedOrder = (orderId: string) => {
    if (orderId.startsWith('RC')) {
      // 跳转到充值记录
      window.location.href = '/user/account?tab=recharge';
    } else if (orderId.startsWith('ORD')) {
      // 跳转到订单记录
      window.location.href = '/user/account?tab=order';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">账单记录</h2>
        <p className="text-sm text-gray-500">查看您的所有账户资金变动记录</p>
      </div>
      
      {mockBillRecords.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  账单号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  变动金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  账户余额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  关联订单
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  备注
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  时间
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockBillRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.type === 'recharge' ? '充值' : '消费'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={record.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                      {record.amount > 0 ? '+' : ''}{record.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ¥{record.balance.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#009688]">
                    <button 
                      onClick={() => handleViewRelatedOrder(record.relatedOrder)}
                      className="hover:underline"
                    >
                      {record.relatedOrder}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.remark}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaFileInvoiceDollar className="mx-auto text-5xl text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">暂无账单记录</p>
        </div>
      )}
    </div>
  );
};

interface UserAccountLayoutProps {
  children?: ReactNode;
  title?: string;
  defaultTab?: string;
}

const UserAccountLayout: React.FC<UserAccountLayoutProps> = ({ 
  children, 
  title = '我的账户',
  defaultTab = 'info'
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');
  const { logout } = useUser();

  // 初始化activeTab
  useEffect(() => {
    // 从URL中获取tab参数
    const { tab } = router.query;
    if (tab && typeof tab === 'string') {
      setActiveTab(tab);
    } else {
      // 如果URL中没有tab参数，确保设置为'info'
      setActiveTab('info');
      // 可选：更新URL以反映默认标签
      if (router.isReady) {
        router.replace('/user/account?tab=info', undefined, { shallow: true });
      }
    }
  }, [router.query, router.isReady]);

  const menuItems = [
    { id: 'info', name: '我的信息', icon: <FaInfoCircle className="mr-2" />, mobileIcon: <FaInfoCircle />, path: '/user/account?tab=info' },
    { id: 'profile', name: '个人资料', icon: <FaUser className="mr-2" />, mobileIcon: <FaUser />, path: '/user/account?tab=profile' },
    { id: 'order', name: '订单记录', icon: <FaShoppingBag className="mr-2" />, mobileIcon: <FaShoppingBag />, path: '/user/account?tab=order' },
    { id: 'recharge', name: '充值记录', icon: <FaWallet className="mr-2" />, mobileIcon: <FaWallet />, path: '/user/account?tab=recharge' },
    { id: 'bill', name: '账单记录', icon: <FaFileInvoiceDollar className="mr-2" />, mobileIcon: <FaFileInvoiceDollar />, path: '/user/account?tab=bill' },
  ];

  // 检查当前路径是否匹配菜单项
  const isActive = (itemId: string) => {
    return itemId === activeTab;
  };

  // 处理退出登录
  const handleLogout = () => {
    if (logout) {
      logout();
      router.push('/login');
    }
  };

  // 渲染内容区域
  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'info':
          return <InfoContent />;
        case 'profile':
          return <ProfileContent />;
        case 'order':
          return <OrderContent />;
        case 'recharge':
          return <RechargeContent />;
        case 'bill':
          return <BillContent />;
        default:
          return children || <InfoContent />;
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return (
        <div className="p-6 text-center">
          <p className="text-red-500">加载内容时出错，请刷新页面重试。</p>
        </div>
      );
    }
  };

  return (
    <Layout title={`${title} - 星海账户`} hidePageTitle={true}>
      <div className="max-w-6xl mx-0 md:mx-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 左侧导航菜单 - 桌面端 */}
          <div className="hidden md:block w-60 flex-shrink-0">
            <div className="bg-[rgb(31,41,55)] rounded-lg shadow-sm overflow-hidden h-[calc(100vh-200px)] sticky top-20">
              <nav className="overflow-y-auto h-full">
                <ul className="flex flex-col pt-2">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        href={item.path}
                        className={`flex items-center px-4 h-12 text-sm transition-colors w-full text-left ${
                          isActive(item.id)
                            ? 'text-white bg-[#009688]'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        {item.icon} {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-3 border-t border-gray-800 px-4 pb-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center h-12 px-0 text-sm transition-colors w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <FaLock className="mr-2" /> 退出登录
                  </button>
                </div>
              </nav>
            </div>
          </div>
          
          {/* 右侧内容区域 - 统一宽度 */}
          <div className="w-full bg-white md:rounded-lg md:shadow-sm p-2 md:p-6 h-auto md:h-[calc(100vh-200px)] overflow-visible md:overflow-auto pb-20 md:pb-6">
            {renderContent()}
          </div>
        </div>
        
        {/* 移动端底部标签栏 */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="flex justify-between items-center">
            {menuItems.map((item) => (
              <Link 
                key={item.id}
                href={item.path}
                className={`flex flex-col items-center justify-center py-3 flex-1 text-xs ${
                  isActive(item.id)
                    ? 'text-[#009688]'
                    : 'text-gray-600'
                }`}
              >
                <div className="text-lg mb-1">{item.mobileIcon}</div>
                <span>{item.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center py-3 flex-1 text-xs text-gray-600"
            >
              <div className="text-lg mb-1"><FaLock /></div>
              <span>退出</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserAccountLayout; 