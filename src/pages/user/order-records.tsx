import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaShoppingBag, FaEye } from 'react-icons/fa';

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

const OrderRecordsPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

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

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <Layout title="订单记录 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaShoppingBag className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">订单记录</h1>
                  <p className="mt-1 text-white/80">查看您的购买历史记录</p>
                </div>
              </div>
            </div>

            {/* 订单列表 */}
            <div className="p-6">
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderRecordsPage; 