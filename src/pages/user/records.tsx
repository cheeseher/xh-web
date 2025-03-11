import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaShoppingBag, FaWallet, FaHistory, FaEye } from 'react-icons/fa';

// 模拟订单记录数据
const mockOrderRecords = [
  {
    orderNumber: 'ORD202403210001',
    productName: 'Gmail账号',
    unitPrice: 50,
    quantity: 1,
    totalAmount: 50,
    orderTime: '2024-03-21 15:30:00',
    status: 'success'
  },
  {
    orderNumber: 'ORD202403210002',
    productName: 'Outlook账号',
    unitPrice: 45,
    quantity: 2,
    totalAmount: 90,
    orderTime: '2024-03-21 16:45:00',
    status: 'pending'
  },
  {
    orderNumber: 'ORD202403210003',
    productName: 'Instagram账号',
    unitPrice: 80,
    quantity: 1,
    totalAmount: 80,
    orderTime: '2024-03-21 18:20:00',
    status: 'failed'
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

const RecordsPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('order');

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
    router.push(`/user/orders/${orderNumber}`);
  };

  const handleViewRelatedOrder = (orderId: string) => {
    if (orderId.startsWith('RC')) {
      setActiveTab('recharge');
    } else if (orderId.startsWith('ORD')) {
      setActiveTab('order');
    }
  };

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <Layout title="我的记录 - 星海账户">
      <div className="container-custom py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                {activeTab === 'order' && <FaShoppingBag className="text-2xl" />}
                {activeTab === 'recharge' && <FaWallet className="text-2xl" />}
                {activeTab === 'bill' && <FaHistory className="text-2xl" />}
                <div>
                  <h1 className="text-2xl font-bold">我的记录</h1>
                  <p className="mt-1 text-white/80">
                    {activeTab === 'order' && '查看您的购买历史记录'}
                    {activeTab === 'recharge' && '查看您的账户充值历史'}
                    {activeTab === 'bill' && '查看您的账户收支明细'}
                  </p>
                </div>
              </div>
            </div>

            {/* 标签栏 */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('order')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'order'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  订单记录
                </button>
                <button
                  onClick={() => setActiveTab('recharge')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'recharge'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  充值记录
                </button>
                <button
                  onClick={() => setActiveTab('bill')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'bill'
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  账单记录
                </button>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="p-6">
              {/* 订单记录 */}
              {activeTab === 'order' && (
                <>
                  {mockOrderRecords.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              订单号
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              商品名
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              单价
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              数量
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              金额
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              下单时间
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
                          {mockOrderRecords.map((order) => (
                            <tr key={order.orderNumber} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                                ¥{order.totalAmount.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.orderTime}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                                  {getStatusText(order.status)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() => handleViewOrder(order.orderNumber)}
                                  className="text-primary hover:text-primary-dark flex items-center"
                                >
                                  <FaEye className="mr-1" />
                                  查看
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FaShoppingBag className="mx-auto text-4xl text-gray-400" />
                      <p className="mt-4 text-gray-500">暂无订单记录</p>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecordsPage; 