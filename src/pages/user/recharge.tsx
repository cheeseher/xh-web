import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import { FaWallet, FaInfoCircle } from 'react-icons/fa';
import Image from 'next/image';

const RechargePage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState<'usdt' | 'other'>('usdt');

  // 从URL获取充值金额
  const amount = router.query.amount ? Number(router.query.amount) : 1000;
  const orderId = router.query.orderId || 'HENDUOHAOVIP266523010194538974';

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <Layout title="支付订单 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部信息 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <div className="flex items-center space-x-3">
                <FaWallet className="text-2xl" />
                <div>
                  <h1 className="text-2xl font-bold">支付订单</h1>
                  <p className="mt-1 text-white/80">请选择支付方式完成充值</p>
                </div>
              </div>
            </div>

            {/* 订单信息 */}
            <div className="p-6 border-b border-gray-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">订单ID</span>
                  <span className="text-gray-900 font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">商品名称</span>
                  <span className="text-gray-900">会员充值-{amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">支付金额</span>
                  <span className="text-2xl font-bold text-primary">¥{amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* 支付方式选择 */}
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">选择支付方式</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('usdt')}
                  className={`p-4 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                    paymentMethod === 'usdt'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <Image
                    src="/images/tether-logo.png"
                    alt="USDT"
                    width={24}
                    height={24}
                  />
                  <span className={paymentMethod === 'usdt' ? 'text-primary' : 'text-gray-700'}>
                    USDT支付
                  </span>
                </button>
                <button
                  className="p-4 border border-gray-200 rounded-lg flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
                  disabled
                >
                  <Image
                    src="/images/other-payment.png"
                    alt="其他支付"
                    width={24}
                    height={24}
                  />
                  <span className="text-gray-400">其他支付</span>
                </button>
              </div>

              {/* 友情提示 */}
              <div className="mt-6 bg-yellow-50 p-4 rounded-md">
                <div className="flex items-start space-x-2">
                  <FaInfoCircle className="text-yellow-600 mt-1 flex-shrink-0" />
                  <div className="text-sm text-yellow-700">
                    <h3 className="font-medium mb-1">友情提示</h3>
                    <ul className="space-y-1">
                      <li>1. 所有支付方式均可正常支付，支付完成后自动发货，请放心使用</li>
                      <li>2. 推荐 注册会员 充值余额后，使用余额支付方式，方便快捷且可省去多次支付的"工"费。</li>
                      <li>3. 数字货币 支付，自助已配置支持所有类型数字货币常用支付（数字货币使用请遵循各国家法律法规）。</li>
                      <li>4. USDT-TRC20支付，不足1U，按照1U计算，到账金额必须一致，否则无法完成支付（数字货币使用请遵循各国家法律法规）。</li>
                      <li>5. 无法转账点击的"警告按钮点击"转账，优先选择其他支付或者查看其他家同类型商品。</li>
                      <li>6. 数字货币平台推荐：币安、欧易、Coinbase、Kraken、Kucoin 等。</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 支付按钮 */}
              <button
                onClick={() => router.push(`/user/payment/usdt?orderId=${orderId}&amount=${amount}`)}
                className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
              >
                立即支付
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RechargePage; 