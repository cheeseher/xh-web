import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import UserAccountLayout from '@/components/UserAccountLayout';
import { useUser } from '@/contexts/UserContext';

// 模拟充值记录数据
const mockRecharges = [
  {
    id: 'RCH20230620001',
    date: '2023-06-20 10:15:32',
    amount: 100.00,
    method: '支付宝',
    status: '成功',
  },
  {
    id: 'RCH20230605002',
    date: '2023-06-05 16:42:18',
    amount: 50.00,
    method: '微信支付',
    status: '成功',
  },
  {
    id: 'RCH20230522003',
    date: '2023-05-22 09:30:45',
    amount: 200.00,
    method: '银行卡',
    status: '成功',
  },
  {
    id: 'RCH20230510004',
    date: '2023-05-10 14:22:37',
    amount: 30.00,
    method: '支付宝',
    status: '成功',
  },
  {
    id: 'RCH20230428005',
    date: '2023-04-28 18:05:12',
    amount: 150.00,
    method: '微信支付',
    status: '成功',
  },
];

const RechargePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [recharges] = useState(mockRecharges);
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    // 如果用户未登录，重定向到登录页
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  // 过滤充值记录
  const filteredRecharges = recharges.filter(recharge => 
    recharge.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    recharge.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 计算总充值金额
  const totalRecharge = recharges.reduce((sum, record) => sum + record.amount, 0);

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 搜索功能已通过状态过滤实现
  };

  return (
    <UserAccountLayout title="充值记录">
      <div className="space-y-6">
        {/* 充值统计 */}
        <div className="bg-[#009688]/5 rounded-lg p-4 border border-[#009688]/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">累计充值金额</h3>
              <p className="text-2xl font-bold text-[#009688]">¥{totalRecharge.toFixed(2)}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => router.push('/user/recharge')}
                className="px-4 h-[42px] bg-[#009688] text-white rounded-md hover:bg-[#00796b] transition-colors"
              >
                立即充值
              </button>
            </div>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex-1 flex">
            <input
              type="text"
              placeholder="搜索充值单号或支付方式"
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

        {/* 充值记录列表 */}
        {filteredRecharges.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">充值单号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支付方式</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecharges.map((recharge) => (
                  <tr key={recharge.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recharge.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recharge.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{recharge.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recharge.method}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {recharge.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            没有找到匹配的充值记录
          </div>
        )}

        {/* 充值说明 */}
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm text-gray-600">
          <h3 className="font-medium text-gray-700 mb-2">充值说明</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>充值成功后，余额会立即到账</li>
            <li>累计充值500元可享受9.5折优惠</li>
            <li>如充值遇到问题，请联系客服处理</li>
            <li>充值记录保存期限为一年</li>
          </ul>
        </div>
      </div>
    </UserAccountLayout>
  );
};

export default RechargePage; 