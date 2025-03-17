import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import PurchaseForm from '../../components/PurchaseForm';
import { FaShieldAlt, FaCheckCircle, FaClock, FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

const AccountDetailPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = router.query;

  // 模拟商品数据
  const account = {
    id: id,
    title: 'Gmail账号',
    description: '全新Gmail账号，支持谷歌全套服务',
    price: 50,
    originalPrice: 100,
    stock: 99,
    features: [
      '账号全新，未使用',
      '支持修改密码',
      '永久售后服务',
      '24小时自动发货'
    ]
  };

  const handlePurchase = async (formData: any) => {
    setIsLoading(true);
    try {
      // 这里模拟购买请求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟成功购买后跳转到订单详情页
      router.push('/user/order-records');
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title={`${account.title} - 账户商城`}>
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 商品信息 */}
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-900">{account.title}</h1>
              <p className="mt-2 text-gray-600">{account.description}</p>
              
              <div className="mt-4 flex items-center space-x-4">
                <div className="text-2xl font-bold text-primary">
                  ¥{account.price}
                </div>
                {account.originalPrice && (
                  <div className="text-lg text-gray-400 line-through">
                    ¥{account.originalPrice}
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {account.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 购买保障 */}
            <div className="p-6 bg-gray-50 border-b">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">购买保障</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <FaShieldAlt className="text-primary text-xl" />
                  <div>
                    <h3 className="font-medium">安全保障</h3>
                    <p className="text-sm text-gray-500">账号安全有保障</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaClock className="text-primary text-xl" />
                  <div>
                    <h3 className="font-medium">极速发货</h3>
                    <p className="text-sm text-gray-500">24小时内发货</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-primary text-xl" />
                  <div>
                    <h3 className="font-medium">售后无忧</h3>
                    <p className="text-sm text-gray-500">7天售后保障</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 购买表单或登录提示 */}
            <div className="p-6">
              {user ? (
                <PurchaseForm
                  onSubmit={handlePurchase}
                  price={account.price}
                  isLoading={isLoading}
                />
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">请先登录</h3>
                  <p className="text-gray-600 mb-4">登录后才能购买商品</p>
                  <Link href={`/login?redirect=/accounts/${id}`}>
                    <a className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      <FaSignInAlt className="mr-2" />
                      立即登录
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountDetailPage; 