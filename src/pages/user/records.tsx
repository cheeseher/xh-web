import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaShoppingBag, FaWallet, FaHistory, FaEye, FaTimes, FaCopy, FaUndo } from 'react-icons/fa';

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
  }
];

// 模拟充值记录数据
const mockRechargeRecords = [
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
];

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

interface UserRecordsProps {
  initialTab?: string;
  standalone?: boolean;
}

const RecordsPage: React.FC<UserRecordsProps> = ({ initialTab, standalone = true }) => {
  const router = useRouter();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(initialTab || 'order');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [orders, setOrders] = useState(mockOrderRecords);
  const [isRefunding, setIsRefunding] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  // 根据URL参数设置活动标签
  useEffect(() => {
    if (router.query.tab && standalone) {
      const tab = router.query.tab as string;
      if (['order', 'recharge', 'bill'].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, [router.query.tab, standalone]);

  // 根据props设置活动标签
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // 当标签改变时更新URL
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (standalone) {
      router.push(`/user/records?tab=${tab}`, undefined, { shallow: true });
    } else {
      // 在嵌入模式下，不更新URL
      router.push(`/user/account?tab=records&recordsTab=${tab}`, undefined, { shallow: true });
    }
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

  const handleViewRelatedOrder = (orderId: string) => {
    if (orderId.startsWith('RC')) {
      setActiveTab('recharge');
    } else if (orderId.startsWith('ORD')) {
      setActiveTab('order');
    }
  };

  // 处理退款申请
  const handleRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!refundReason.trim()) {
      setMessage({ type: 'error', text: '请填写退款原因' });
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
      setRefundReason('');
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

  if (!user && standalone) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  const content = (
    <>
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#009688]/20 to-[#009688]/10 rounded-full flex items-center justify-center">
            <FaHistory className="text-[#009688] text-xl" />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-gray-900">消费记录</h1>
            <p className="text-sm text-gray-500">查看您的账户交易记录</p>
          </div>
        </div>

        {message.text && (
          <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* 标签栏 */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto whitespace-nowrap hide-scrollbar">
            <button
              onClick={() => handleTabChange('order')}
              className={`px-6 py-4 text-sm font-medium transition-colors relative flex-shrink-0 ${
                activeTab === 'order'
                  ? 'border-b-2 border-[#009688] text-[#009688]'
                  : 'text-gray-600 hover:text-[#009688]'
              }`}
            >
              订单记录
              {activeTab === 'order' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#009688]"></div>}
            </button>
            <button
              onClick={() => handleTabChange('recharge')}
              className={`px-6 py-4 text-sm font-medium transition-colors relative flex-shrink-0 ${
                activeTab === 'recharge'
                  ? 'border-b-2 border-[#009688] text-[#009688]'
                  : 'text-gray-600 hover:text-[#009688]'
              }`}
            >
              充值记录
              {activeTab === 'recharge' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#009688]"></div>}
            </button>
            <button
              onClick={() => handleTabChange('bill')}
              className={`px-6 py-4 text-sm font-medium transition-colors relative flex-shrink-0 ${
                activeTab === 'bill'
                  ? 'border-b-2 border-[#009688] text-[#009688]'
                  : 'text-gray-600 hover:text-[#009688]'
              }`}
            >
              账单记录
              {activeTab === 'bill' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#009688]"></div>}
            </button>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-6 pt-8 sm:pt-6">
        {/* 订单记录 */}
        {activeTab === 'order' && (
          <>
            {orders.length > 0 ? (
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
                    {orders.map((order) => (
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
                          <div className="flex space-x-2">
                            {order.status === 'success' && (
                              <button
                                onClick={() => handleViewOrder(order.orderNumber)}
                                className="text-[#009688] hover:text-[#00796b] flex items-center transition-colors"
                                title="查看"
                              >
                                <FaEye />
                              </button>
                            )}
                            {order.canRefund && (
                              <button 
                                onClick={() => handleRefundRequest(order.orderNumber)}
                                className="text-red-500 hover:text-red-700"
                                title="申请退款"
                              >
                                <FaUndo />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <FaShoppingBag className="mx-auto text-5xl text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">暂无订单记录</p>
              </div>
            )}
          </>
        )}

        {/* 充值记录 */}
        {activeTab === 'recharge' && (
          <>
            {mockRechargeRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        充值单号
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        充值金额
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        支付方式
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        充值时间
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockRechargeRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaWallet className="mx-auto text-4xl text-gray-400" />
                <p className="mt-4 text-gray-500">暂无充值记录</p>
              </div>
            )}
          </>
        )}

        {/* 账单记录 */}
        {activeTab === 'bill' && (
          <>
            {mockBillRecords.length > 0 ? (
              <div className="overflow-x-auto">
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.type === 'recharge' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {record.type === 'recharge' ? '充值' : '消费'}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                          record.type === 'recharge' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {record.type === 'recharge' ? '+' : ''}{record.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                          ¥{record.balance.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                          <button
                            onClick={() => handleViewRelatedOrder(record.relatedOrder)}
                            className="hover:underline"
                          >
                            {record.relatedOrder}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
              <div className="text-center py-8">
                <FaHistory className="mx-auto text-4xl text-gray-400" />
                <p className="mt-4 text-gray-500">暂无账单记录</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* 订单详情弹窗 */}
      {showOrderModal && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">订单详情</h3>
              <button 
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <div className="text-sm text-gray-500 mb-2">订单号</div>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-900 font-medium">{currentOrder.orderNumber}</span>
                  <button 
                    onClick={() => handleCopyText(currentOrder.orderNumber)}
                    className="ml-2 text-primary hover:text-primary-dark transition-colors"
                  >
                    <FaCopy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-2">接收账户邮箱</div>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-900 font-medium">{currentOrder.email}</span>
                  <button 
                    onClick={() => handleCopyText(currentOrder.email)}
                    className="ml-2 text-primary hover:text-primary-dark transition-colors"
                  >
                    <FaCopy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-2">查询密码</div>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-900 font-medium">{currentOrder.password}</span>
                  <button 
                    onClick={() => handleCopyText(currentOrder.password)}
                    className="ml-2 text-primary hover:text-primary-dark transition-colors"
                  >
                    <FaCopy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-2">卡密信息</div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">请妥善保管以下信息</span>
                    <button 
                      onClick={() => handleCopyText(currentOrder.cardInfo)}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      <FaCopy className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-900 break-all font-mono bg-white p-3 rounded border border-gray-200">
                    {currentOrder.cardInfo}
                  </div>
                </div>
              </div>
              
              {copySuccess && (
                <div className="text-center text-green-500 text-sm bg-green-50 py-2 px-4 rounded-lg">
                  {copySuccess}
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <button
                onClick={() => setShowOrderModal(false)}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 退款申请弹窗 */}
      {isRefunding && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">申请退款</h3>
            <p className="text-sm text-gray-500 mb-4">
              订单号: <span className="font-medium text-gray-700">{currentOrder.orderNumber}</span>
            </p>
            
            <form onSubmit={handleRefundSubmit}>
              <div className="mb-4">
                <label htmlFor="refundReason" className="block text-sm font-medium text-gray-700 mb-1">
                  退款原因
                </label>
                <textarea
                  id="refundReason"
                  rows={4}
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]"
                  placeholder="请详细说明退款原因..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsRefunding(false);
                    setCurrentOrder(null);
                    setRefundReason('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#009688] text-white rounded-md hover:bg-[#00796b]"
                >
                  提交申请
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );

  // 如果是独立页面，使用Layout包装
  if (standalone) {
    return (
      <Layout title="消费记录 - 星海账户">
        <div className="container-custom py-8 px-2 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {content}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // 如果是嵌入在其他页面中，直接返回内容
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {content}
    </div>
  );
};

export default RecordsPage; 