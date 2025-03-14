import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaFileDownload, FaUndo } from 'react-icons/fa';
import UserAccountLayout from '@/components/UserAccountLayout';
import { useUser } from '@/contexts/UserContext';

// 模拟订单数据
const mockOrders = [
  {
    id: 'ORD20230615001',
    date: '2023-06-15 14:30:22',
    product: 'Gmail账号 - 美国地区',
    quantity: 2,
    amount: 39.8,
    status: '已完成',
    canRefund: true,
  },
  {
    id: 'ORD20230528002',
    date: '2023-05-28 09:15:43',
    product: 'Twitter账号 - 国际版',
    quantity: 1,
    amount: 25.5,
    status: '已完成',
    canRefund: true,
  },
  {
    id: 'ORD20230510003',
    date: '2023-05-10 18:22:10',
    product: 'Instagram账号 - 高质量',
    quantity: 3,
    amount: 87.0,
    status: '已完成',
    canRefund: false,
  },
  {
    id: 'ORD20230422004',
    date: '2023-04-22 11:05:37',
    product: 'Facebook账号 - 美国地区',
    quantity: 1,
    amount: 35.0,
    status: '已完成',
    canRefund: false,
  },
  {
    id: 'ORD20230405005',
    date: '2023-04-05 16:48:59',
    product: 'Outlook邮箱 - 企业版',
    quantity: 5,
    amount: 125.0,
    status: '已完成',
    canRefund: false,
  },
];

const OrdersPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isRefunding, setIsRefunding] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  if (!user) {
    // 如果用户未登录，重定向到登录页
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  // 过滤订单
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 搜索功能已通过状态过滤实现
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
        order.id === selectedOrder 
          ? { ...order, status: '退款处理中', canRefund: false } 
          : order
      ));
      
      setMessage({ type: 'success', text: '退款申请已提交，请等待处理' });
      setIsRefunding(false);
      setSelectedOrder(null);
      setRefundReason('');
    } catch (error) {
      setMessage({ type: 'error', text: '申请失败，请稍后重试' });
    }
  };

  return (
    <UserAccountLayout title="订单记录">
      <div className="space-y-6">
        {message.text && (
          <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* 搜索栏 */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex-1 flex">
            <input
              type="text"
              placeholder="搜索订单号或商品名称"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 h-[42px] px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]"
            />
            <button
              type="submit"
              className="h-[42px] px-4 bg-[#009688] text-white rounded-r-md hover:bg-[#00796b] transition-colors"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* 订单列表 */}
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{order.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === '已完成' ? 'bg-green-100 text-green-800' : 
                        order.status === '退款处理中' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <button 
                        className="text-[#009688] hover:text-[#00796b]"
                        title="下载账号"
                      >
                        <FaFileDownload />
                      </button>
                      {order.canRefund && (
                        <button 
                          className="text-red-500 hover:text-red-700 ml-3"
                          onClick={() => {
                            setSelectedOrder(order.id);
                            setIsRefunding(true);
                          }}
                          title="申请退款"
                        >
                          <FaUndo />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            没有找到匹配的订单记录
          </div>
        )}

        {/* 退款申请弹窗 */}
        {isRefunding && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">申请退款</h3>
              <p className="text-sm text-gray-500 mb-4">
                订单号: <span className="font-medium text-gray-700">{selectedOrder}</span>
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
                      setSelectedOrder(null);
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
      </div>
    </UserAccountLayout>
  );
};

export default OrdersPage; 