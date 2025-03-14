import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaUser, FaKey, FaShoppingBag, FaWallet, FaFileInvoiceDollar, FaEdit, FaLock, FaHistory, FaEye, FaUndo, FaTimes, FaCopy } from 'react-icons/fa';
import Layout from './Layout';
import { useUser } from '../contexts/UserContext';
import Link from 'next/link';

// 创建一个简单的加载组件
const LoadingComponent = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009688]"></div>
  </div>
);

// 内联组件：个人资料
const ProfileContent = () => {
  const { user } = useUser();
  const [nickname, setNickname] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (user) {
      setNickname(user.username || '');
      setEmail(user.email || '');
    }
  }, [user]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟API请求
    setTimeout(() => {
      // 更新用户信息
      if (user) {
        const updatedUser = {
          ...user,
          username: nickname
        };
        // 这里应该调用setUser更新全局用户状态，但为了简化，我们只显示成功消息
      }
      
      setMessage({ type: 'success', text: '个人信息修改成功！' });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">个人资料</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
            昵称
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full md:w-2/3 lg:w-1/2 px-3 py-2 h-[42px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]"
            placeholder="user@example.com"
          />
          <p className="mt-1 text-xs text-gray-500">昵称长度2-20个字符，支持中英文、数字和下划线</p>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            邮箱
          </label>
          <input
            id="email"
            type="email"
            value={email}
            readOnly
            className="w-full md:w-2/3 lg:w-1/2 px-3 py-2 h-[42px] border border-gray-300 rounded-md bg-gray-50"
            placeholder="user@example.com@example.com"
          />
          <p className="mt-1 text-xs text-gray-500">邮箱不可修改</p>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 h-[42px] bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors disabled:opacity-70"
          >
            {isSubmitting ? '保存中...' : '保存修改'}
          </button>
        </div>
      </form>
    </div>
  );
};

// 内联组件：修改密码
const PasswordContent = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    // 简单验证
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: '请填写所有字段' });
      setIsSubmitting(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: '两次输入的新密码不一致' });
      setIsSubmitting(false);
      return;
    }

    // 模拟API请求
    setTimeout(() => {
      setMessage({ type: 'success', text: '密码修改成功！' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">修改密码</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
            当前密码
          </label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full md:w-2/3 lg:w-1/2 h-[42px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]"
            placeholder="请输入当前密码"
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            新密码
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full md:w-2/3 lg:w-1/2 h-[42px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]"
            placeholder="请输入新密码"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            确认新密码
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full md:w-2/3 lg:w-1/2 h-[42px] px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]"
            placeholder="请再次输入新密码"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 h-[42px] bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors disabled:opacity-70"
          >
            {isSubmitting ? '提交中...' : '修改密码'}
          </button>
        </div>
      </form>
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
      cardInfo: 'gmail123@gmail.com----Password123----backup@example.com',
      canRefund: true
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
      cardInfo: 'outlook123@outlook.com----Password456----backup2@example.com',
      canRefund: false
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
      cardInfo: 'instagram123@gmail.com----Password789----backup3@example.com',
      canRefund: false
    },
    {
      orderNumber: 'ORD202403210004',
      productName: 'Twitter账号',
      unitPrice: 60,
      quantity: 1,
      totalAmount: 60,
      orderTime: '2024-03-22 09:15:00',
      status: 'success',
      email: 'user4@example.com',
      password: 'twitter123',
      cardInfo: 'twitter123@gmail.com----Password123----backup4@example.com',
      canRefund: true
    },
    {
      orderNumber: 'ORD202403210005',
      productName: 'Facebook账号',
      unitPrice: 70,
      quantity: 1,
      totalAmount: 70,
      orderTime: '2024-03-22 11:30:00',
      status: 'success',
      email: 'user5@example.com',
      password: 'facebook123',
      cardInfo: 'facebook123@gmail.com----Password123----backup5@example.com',
      canRefund: true
    },
    {
      orderNumber: 'ORD202403210006',
      productName: 'LinkedIn账号',
      unitPrice: 90,
      quantity: 1,
      totalAmount: 90,
      orderTime: '2024-03-22 14:45:00',
      status: 'pending',
      email: 'user6@example.com',
      password: 'linkedin123',
      cardInfo: 'linkedin123@gmail.com----Password123----backup6@example.com',
      canRefund: false
    },
    {
      orderNumber: 'ORD202403210007',
      productName: 'Pinterest账号',
      unitPrice: 55,
      quantity: 1,
      totalAmount: 55,
      orderTime: '2024-03-23 10:20:00',
      status: 'success',
      email: 'user7@example.com',
      password: 'pinterest123',
      cardInfo: 'pinterest123@gmail.com----Password123----backup7@example.com',
      canRefund: true
    }
  ];

  const [orders, setOrders] = useState(mockOrderRecords);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isRefunding, setIsRefunding] = useState(false);
  const [refundDescription, setRefundDescription] = useState('');
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
      case 'refunding':
        return '退款审核中';
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

  // 处理退款申请
  const handleRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!refundDescription.trim()) {
      setMessage({ type: 'error', text: '请填写退款说明' });
      return;
    }

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 更新订单状态
      setOrders(prev => prev.map(order => 
        order.orderNumber === currentOrder?.orderNumber 
          ? { ...order, status: 'refunding', canRefund: false } 
          : order
      ));
      
      setMessage({ type: 'success', text: '退款申请已提交，请等待处理' });
      setIsRefunding(false);
      setCurrentOrder(null);
      setRefundDescription('');
    } catch (error) {
      setMessage({ type: 'error', text: '申请失败，请稍后重试' });
    }
  };

  // 打开退款弹窗
  const handleRefundRequest = (orderNumber: string) => {
    const order = orders.find(order => order.orderNumber === orderNumber);
    if (order && order.canRefund) {
      setCurrentOrder(order);
      setIsRefunding(true);
    }
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
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-[#009688]/10 rounded-full flex items-center justify-center">
          <FaShoppingBag className="text-[#009688] text-xl" />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-medium text-gray-900">订单记录</h2>
          <p className="text-sm text-gray-500">查看您的所有购买订单</p>
        </div>
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
                            className="text-[#009688] hover:text-[#00796b] transition-colors"
                            title="查看"
                          >
                            查看
                          </button>
                        )}
                        {order.canRefund && (
                          <button 
                            onClick={() => handleRefundRequest(order.orderNumber)}
                            className="text-red-500 hover:text-red-700"
                            title="申请退款"
                          >
                            申请退款
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">订单号</p>
                  <p className="font-medium">{currentOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">下单时间</p>
                  <p className="font-medium">{currentOrder.orderTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">商品名称</p>
                  <p className="font-medium">{currentOrder.productName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">订单金额</p>
                  <p className="font-medium text-[#009688]">¥{currentOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h4 className="font-medium mb-3">账号信息</h4>
                <div className="bg-gray-50 p-4 rounded-md mb-4 relative">
                  <pre className="text-sm whitespace-pre-wrap break-all">{currentOrder.cardInfo}</pre>
                  <button 
                    onClick={() => handleCopyText(currentOrder.cardInfo)}
                    className="absolute top-2 right-2 text-[#009688] hover:text-[#00796b]"
                    title="复制"
                  >
                    <FaCopy />
                  </button>
                  {copySuccess && (
                    <div className="absolute top-2 right-8 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {copySuccess}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 退款申请弹窗 */}
      {isRefunding && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-medium">申请退款</h3>
              <button 
                onClick={() => {
                  setIsRefunding(false);
                  setRefundDescription('');
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleRefundSubmit} className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">订单号</p>
                <p className="font-medium">{currentOrder.orderNumber}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">商品名称</p>
                <p className="font-medium">{currentOrder.productName}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">订单金额</p>
                <p className="font-medium text-[#009688]">¥{currentOrder.totalAmount.toFixed(2)}</p>
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  详细说明
                </label>
                <textarea
                  id="description"
                  value={refundDescription}
                  onChange={(e) => setRefundDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsRefunding(false);
                    setRefundDescription('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors"
                >
                  提交申请
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// 内联组件：充值记录
const RechargeContent = () => {
  // 模拟充值记录数据
  const [mockRechargeRecords, setMockRechargeRecords] = useState([
    {
      id: 'RC202403210001',
      amount: 100,
      method: 'USDT',
      status: 'success',
      time: '2024-03-21 15:30:00'
    },
    {
      id: 'RC202403210002',
      amount: 200,
      method: 'USDT',
      status: 'pending',
      time: '2024-03-21 16:45:00'
    },
    {
      id: 'RC202403210003',
      amount: 500,
      method: '其他方式',
      status: 'failed',
      time: '2024-03-21 18:20:00'
    }
  ]);

  const [showRefundForm, setShowRefundForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [refundDescription, setRefundDescription] = useState('');
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return '充值成功';
      case 'pending':
        return '处理中';
      case 'failed':
        return '充值失败';
      case 'refunding':
        return '退款审核中';
      default:
        return status;
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
  
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('复制成功');
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  };
  
  const handleRefundRequest = (orderNumber: string) => {
    setSelectedOrder(orderNumber);
    setShowRefundForm(true);
  };
  
  const handleRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 这里是模拟提交退款申请的逻辑
    try {
      // 实际项目中这里会调用API
      console.log('提交退款申请', {
        orderNumber: selectedOrder,
        description: refundDescription
      });
      
      // 更新充值记录状态
      setMockRechargeRecords(prevRecords => 
        prevRecords.map(record => 
          record.id === selectedOrder 
            ? { ...record, status: 'refunding' } 
            : record
        )
      );
      
      // 模拟成功响应
      alert('退款申请已提交，我们将尽快处理');
      
      // 重置表单
      setShowRefundForm(false);
      setRefundDescription('');
    } catch (error) {
      console.error('提交退款申请失败:', error);
      alert('提交失败，请稍后重试');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-[#009688]/10 rounded-full flex items-center justify-center">
          <FaWallet className="text-[#009688] text-xl" />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-medium text-gray-900">充值记录</h2>
          <p className="text-sm text-gray-500">查看您的所有充值记录</p>
        </div>
      </div>
      
      {/* 退款申请表单 */}
      {showRefundForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">申请退款</h3>
              <button
                onClick={() => {
                  setShowRefundForm(false);
                  setRefundDescription('');
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes />
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">订单号: {selectedOrder}</p>
            
            <form onSubmit={handleRefundSubmit} className="space-y-4">
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowRefundForm(false);
                    setRefundDescription('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors"
                >
                  提交申请
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
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
                  支付方式
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRechargeRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-medium">{record.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#009688]">
                    ¥{record.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(record.status)}`}>
                      {getStatusText(record.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {record.status === 'success' && (
                      <button
                        onClick={() => handleRefundRequest(record.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        申请退款
                      </button>
                    )}
                    {record.status === 'refunding' && (
                      <span className="text-gray-400">已申请退款</span>
                    )}
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
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-[#009688]/10 rounded-full flex items-center justify-center">
          <FaFileInvoiceDollar className="text-[#009688] text-xl" />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-medium text-gray-900">账单记录</h2>
          <p className="text-sm text-gray-500">查看您的所有账户资金变动记录</p>
        </div>
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
  defaultTab = 'profile'
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { logout } = useUser();

  // 初始化activeTab
  useEffect(() => {
    // 从URL中获取tab参数
    const { tab } = router.query;
    if (tab) {
      setActiveTab(tab as string);
    }
  }, [router.query]);

  const menuItems = [
    { id: 'profile', name: '个人资料', icon: <FaUser className="mr-2" />, mobileIcon: <FaUser />, path: '/user/account?tab=profile' },
    { id: 'password', name: '修改密码', icon: <FaKey className="mr-2" />, mobileIcon: <FaKey />, path: '/user/account?tab=password' },
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
        case 'profile':
          return <ProfileContent />;
        case 'password':
          return <PasswordContent />;
        case 'order':
          return <OrderContent />;
        case 'recharge':
          return <RechargeContent />;
        case 'bill':
          return <BillContent />;
        default:
          return children || <ProfileContent />;
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
    <Layout title={`${title} - 账户商城`}>
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
          <div className="w-full bg-white rounded-lg shadow-sm p-2 md:p-6 h-[calc(100vh-200px)] md:h-[calc(100vh-200px)] overflow-auto pb-20 md:pb-6">
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