import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaHistory } from 'react-icons/fa';

// 模拟账单记录数据
const mockBillRecords = [
  {
    id: 'BL202403210001',
    type: 'recharge',
    amount: 100,
    balance: 100,
    relatedOrder: 'RC202403210001',
    remark: '支付宝充值',
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
    remark: '微信支付充值',
    time: '2024-03-21 18:20:00'
  }
];

const BillRecordsPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleViewOrder = (orderId: string) => {
    if (orderId.startsWith('RC')) {
      router.push(`/user/recharge-records`);
    } else if (orderId.startsWith('ORD')) {
      router.push(`/user/order-records`);
    }
  };

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <Layout title="账单记录 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaHistory className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">账单记录</h1>
                  <p className="mt-1 text-white/80">查看您的账户收支明细</p>
                </div>
              </div>
            </div>

            {/* 账单记录列表 */}
            <div className="p-6">
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
                              onClick={() => handleViewOrder(record.relatedOrder)}
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BillRecordsPage; 