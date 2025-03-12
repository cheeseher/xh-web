import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaWallet, FaInfoCircle, FaUser, FaMoneyBillWave, FaCrown } from 'react-icons/fa';
import Image from 'next/image';

const RechargePage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  // 未登录时重定向到登录页面
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleRecharge = () => {
    const amount = selectedAmount || Number(customAmount);
    if (amount > 0) {
      router.push(`/user/payment/usdt?orderId=RECHARGE${Date.now()}&amount=${amount}`);
    } else {
      alert('请选择或输入充值金额');
    }
  };

  return (
    <Layout title="账户充值 - 星海账户" hidePageTitle={true}>
      <div className="max-w-4xl mx-auto py-8 px-2 sm:px-4">
        {/* 页面头部 */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            <FaWallet className="text-primary text-xl" />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-gray-900">账户充值</h1>
            <p className="text-sm text-gray-500">为账户余额充值</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 账号信息卡片 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <FaUser className="text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">账号信息</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-sm text-gray-500 mb-1 sm:mb-0">账户昵称</span>
                <span className="font-medium text-gray-900">{user.username}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-sm text-gray-500 mb-1 sm:mb-0">账户邮箱</span>
                <span className="font-medium text-gray-900 break-all">{user.email || 'dbadmin@qq.com'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-sm text-gray-500 mb-1 sm:mb-0">会员等级</span>
                <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 rounded text-sm font-medium w-fit">
                  VIP{user.vipLevel || 1}
                </span>
              </div>
            </div>
          </div>

          {/* 余额信息卡片 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <FaWallet className="text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">余额信息</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">当前余额</span>
                <span className="font-medium text-2xl text-primary">{user.balance || 99} 元</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">累计充值</span>
                <span className="font-medium text-gray-900">500 元</span>
              </div>
            </div>
          </div>
        </div>

        {/* 充值金额卡片 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaMoneyBillWave className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">充值金额</h2>
          </div>

          {/* VIP升级提示 */}
          <div className="flex items-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg mb-6">
            <FaInfoCircle className="flex-shrink-0" />
            <span className="text-sm">继续充值 401 元升级VIP1</span>
          </div>

          {/* 快捷金额选择 */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
            {[50, 100, 200, 300, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`py-3 px-4 rounded-lg transition-all duration-200 ${
                  selectedAmount === amount
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {amount} 元
              </button>
            ))}
          </div>

          {/* 自定义金额输入 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">自定义充值金额</label>
            <div className="flex items-center">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="请输入充值金额"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">元</span>
              </div>
            </div>
          </div>

          {/* 充值按钮 */}
          <button
            onClick={handleRecharge}
            className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center"
          >
            <FaWallet className="mr-2" />
            立即充值
          </button>
        </div>

        {/* 会员等级说明卡片 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <FaCrown className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">会员等级说明</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-l-lg">会员等级</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">充值折扣</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-r-lg">升级条件</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm text-gray-600">普通用户</td>
                  <td className="px-4 py-3 text-sm text-gray-600">无折扣</td>
                  <td className="px-4 py-3 text-sm text-gray-600">默认</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm text-gray-600">VIP1</td>
                  <td className="px-4 py-3 text-sm text-gray-600">9.5折</td>
                  <td className="px-4 py-3 text-sm text-gray-600">累计充值 500 元</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm text-gray-600">VIP2</td>
                  <td className="px-4 py-3 text-sm text-gray-600">9折</td>
                  <td className="px-4 py-3 text-sm text-gray-600">累计充值 1000 元</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm text-gray-600">VIP3</td>
                  <td className="px-4 py-3 text-sm text-gray-600">8折</td>
                  <td className="px-4 py-3 text-sm text-gray-600">累计充值 5000 元</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RechargePage; 