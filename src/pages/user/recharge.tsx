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

  // 计算VIP等级进度
  const calculateVipProgress = () => {
    // VIP等级阈值
    const vipThresholds = [0, 500, 2000];
    
    // 当前VIP等级
    const currentVipLevel = user.vipLevel || 1;
    
    // 如果已经是最高等级
    if (currentVipLevel >= vipThresholds.length - 1) {
      return {
        progress: 100,
        nextLevelDiff: 0,
        isMaxLevel: true
      };
    }
    
    // 假设当前累计充值为300元（距离500元还差200元）
    const totalRecharge = 300;
    const currentThreshold = vipThresholds[currentVipLevel - 1];
    const nextThreshold = vipThresholds[currentVipLevel];
    
    // 计算进度百分比
    const progress = Math.min(100, Math.round((totalRecharge - currentThreshold) / (nextThreshold - currentThreshold) * 100));
    
    // 固定为200元升级
    const nextLevelDiff = 200;
    
    return {
      progress,
      nextLevelDiff,
      isMaxLevel: false
    };
  };
  
  const vipProgress = calculateVipProgress();

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
      <div className="max-w-4xl mx-auto py-2 sm:py-4 px-2 sm:px-4">
        {/* 页面头部 */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            <FaWallet className="text-primary text-xl" />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-gray-900">账户充值</h1>
            <p className="text-sm text-gray-500">为账户余额充值</p>
          </div>
        </div>

        {/* 合并账号信息和余额信息为一个卡片 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 账号信息 */}
            <div>
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
                
                {/* VIP等级进度条 */}
                {!vipProgress.isMaxLevel ? (
                  <div className="mt-2">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                      <span>VIP{user.vipLevel || 1}</span>
                      <span>VIP{(user.vipLevel || 1) + 1}</span>
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
            <div>
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
                  <span className="font-medium text-gray-900">300 元</span>
                </div>
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

        {/* 充值金额卡片 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaMoneyBillWave className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">充值金额</h2>
          </div>

          {/* VIP升级提示 */}
          <div className="flex items-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg mb-6">
            <FaInfoCircle className="flex-shrink-0" />
            <span className="text-sm">继续充值 200 元升级VIP2</span>
          </div>

          {/* 快捷金额选择 */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
            {[50, 100, 200, 300, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`h-[42px] rounded-lg transition-all duration-200 ${
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
              <div className="relative flex-1 max-w-xs flex items-center">
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  onFocus={() => setSelectedAmount(null)}
                  placeholder="请输入充值金额"
                  className="w-full px-4 h-[42px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <span className="ml-2 text-gray-700">元</span>
              </div>
            </div>
          </div>

          {/* 充值按钮 */}
          <button
            onClick={handleRecharge}
            className="w-full md:w-auto px-8 h-[42px] bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center"
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">升级条件</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 rounded-r-lg">会员介绍</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm text-gray-600">普通用户</td>
                  <td className="px-4 py-3 text-sm text-gray-600">无折扣</td>
                  <td className="px-4 py-3 text-sm text-gray-600">默认</td>
                  <td className="px-4 py-3 text-sm text-gray-600">基础账户，可使用所有基本功能</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm text-gray-600">VIP1</td>
                  <td className="px-4 py-3 text-sm text-gray-600">9.5折</td>
                  <td className="px-4 py-3 text-sm text-gray-600">累计充值 500 元</td>
                  <td className="px-4 py-3 text-sm text-gray-600">享受9.5折优惠，优先客服支持</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm text-gray-600">VIP2</td>
                  <td className="px-4 py-3 text-sm text-gray-600">9折</td>
                  <td className="px-4 py-3 text-sm text-gray-600">累计充值 1000 元</td>
                  <td className="px-4 py-3 text-sm text-gray-600">享受9折优惠，专属客服通道</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm text-gray-600">VIP3</td>
                  <td className="px-4 py-3 text-sm text-gray-600">8折</td>
                  <td className="px-4 py-3 text-sm text-gray-600">累计充值 5000 元</td>
                  <td className="px-4 py-3 text-sm text-gray-600">享受8折优惠，专属客服和定制服务</td>
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