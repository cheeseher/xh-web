import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaWallet, FaInfoCircle } from 'react-icons/fa';
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
    <Layout title="账户充值 - 星海账户">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">充值</h1>
        
        <div className="bg-white p-6 border border-gray-200 rounded-md mb-6">
          <h2 className="text-lg font-medium mb-4">账号信息</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">账户昵称</div>
                <div className="font-medium">{user.username}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">账户邮箱</div>
                <div className="font-medium">{user.email || 'dbadmin@qq.com'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">会员等级</div>
                <div className="font-medium">VIP{user.vipLevel || 1}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 border border-gray-200 rounded-md mb-6">
          <h2 className="text-lg font-medium mb-4">余额信息</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">当前余额</div>
                <div className="font-medium">{user.balance || 99} 元</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">累计充值金额</div>
                <div className="font-medium">500 元</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 border border-gray-200 rounded-md mb-6">
          <h2 className="text-lg font-medium mb-4">充值金额</h2>
          <div className="text-sm text-red-500 mb-4">继续充值 401 元升级VIP1</div>
          
          <div className="grid grid-cols-6 gap-4 mb-6">
            <button 
              onClick={() => handleAmountSelect(50)}
              className={`py-2 border ${selectedAmount === 50 ? 'border-primary bg-primary/10' : 'border-gray-300'} rounded-md hover:border-primary transition-colors`}
            >
              50 元
            </button>
            <button 
              onClick={() => handleAmountSelect(100)}
              className={`py-2 border ${selectedAmount === 100 ? 'border-primary bg-primary/10' : 'border-gray-300'} rounded-md hover:border-primary transition-colors`}
            >
              100 元
            </button>
            <button 
              onClick={() => handleAmountSelect(200)}
              className={`py-2 border ${selectedAmount === 200 ? 'border-primary bg-primary/10' : 'border-gray-300'} rounded-md hover:border-primary transition-colors`}
            >
              200 元
            </button>
            <button 
              onClick={() => handleAmountSelect(300)}
              className={`py-2 border ${selectedAmount === 300 ? 'border-primary bg-primary/10' : 'border-gray-300'} rounded-md hover:border-primary transition-colors`}
            >
              300 元
            </button>
            <button 
              onClick={() => handleAmountSelect(500)}
              className={`py-2 border ${selectedAmount === 500 ? 'border-primary bg-primary/10' : 'border-gray-300'} rounded-md hover:border-primary transition-colors`}
            >
              500 元
            </button>
            <button 
              onClick={() => handleAmountSelect(1000)}
              className={`py-2 border ${selectedAmount === 1000 ? 'border-primary bg-primary/10' : 'border-gray-300'} rounded-md hover:border-primary transition-colors`}
            >
              1000 元
            </button>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">请输入充值金额：</label>
            <div className="flex items-center">
              <input
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="请输入"
                className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <span className="ml-2">元</span>
            </div>
          </div>
          
          <button
            onClick={handleRecharge}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            立即充值
          </button>
        </div>
        
        <div className="bg-white p-6 border border-gray-200 rounded-md">
          <h2 className="text-lg font-medium mb-4">会员等级说明</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left">会员等级</th>
                <th className="border border-gray-200 px-4 py-2 text-left">充值折扣</th>
                <th className="border border-gray-200 px-4 py-2 text-left">升级条件</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">普通用户</td>
                <td className="border border-gray-200 px-4 py-2">无折扣</td>
                <td className="border border-gray-200 px-4 py-2">默认</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">VIP1</td>
                <td className="border border-gray-200 px-4 py-2">9.5折</td>
                <td className="border border-gray-200 px-4 py-2">累计充值 500 元</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">VIP2</td>
                <td className="border border-gray-200 px-4 py-2">9折</td>
                <td className="border border-gray-200 px-4 py-2">累计充值 1000 元</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">VIP3</td>
                <td className="border border-gray-200 px-4 py-2">8折</td>
                <td className="border border-gray-200 px-4 py-2">累计充值 5000 元</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default RechargePage; 