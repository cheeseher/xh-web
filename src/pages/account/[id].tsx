import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { accounts } from '../../utils/mockData';
import { FaShoppingCart, FaCheck, FaArrowLeft, FaInfoCircle, FaGoogle } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const AccountDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [queryPassword, setQueryPassword] = useState('');
  const [receiveEmail, setReceiveEmail] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // 查找当前账户
  const account = accounts.find((acc) => acc.id === id);

  // 如果账户不存在或正在加载
  if (!account && typeof id === 'string') {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-3xl font-bold text-dark mb-4">账户不存在</h1>
          <p className="text-gray-600 mb-8">您查找的账户不存在或已被删除。</p>
          <Link href="/" className="btn btn-primary">
            返回首页
          </Link>
        </div>
      </Layout>
    );
  }

  // 如果路由还在加载中
  if (!account) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-3xl font-bold text-dark">加载中...</h1>
        </div>
      </Layout>
    );
  }

  // 处理添加到购物车
  const handleAddToCart = () => {
    if (!agreed) {
      alert('请先阅读并同意服务协议和告后协议');
      return;
    }
    if (!receiveEmail) {
      alert('请输入接收邮箱');
      return;
    }
    if (!queryPassword) {
      alert('请输入查询密码');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: account.id,
        title: account.title,
        price: account.price,
        image: account.image,
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    router.push('/checkout');
  };

  // 计算批发价
  const getWholesalePrice = () => {
    return (account.price * 0.95).toFixed(2);
  };

  return (
    <Layout
      title={`${account.title} - 账户商城`}
      description={account.description}
    >
      <div className="container-custom py-6">
        {/* 面包屑导航 */}
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary">首页</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${account.category}`} className="hover:text-primary">{account.categoryName}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{account.title}</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* 账户图片 */}
            <div className="md:w-1/3 p-6 flex items-center justify-center bg-gray-50">
              <div className="relative h-64 w-64">
                <Image
                  src={account.image}
                  alt={account.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* 账户信息 */}
            <div className="md:w-2/3 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-sm text-sm">自助发货</span>
                <span className="text-gray-500 text-sm">库存: {account.stock}</span>
                <span className="text-blue-500 text-sm hover:text-blue-600 cursor-pointer">通知补货?</span>
              </div>

              <h1 className="text-xl font-medium text-gray-800 mb-4">{account.title}</h1>

              <div className="space-y-4 mb-6">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-red-500">¥{account.price.toFixed(2)}</span>
                  <span className="ml-2 text-gray-400 line-through">¥{(account.price * 1.5).toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  批发价：≥500个{getWholesalePrice()} <span className="text-red-500">更有批发优惠</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <span className="w-20 text-gray-600">数量：</span>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(account.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-16 text-center py-1 border-none focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(account.stock, quantity + 1))}
                      className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                      disabled={quantity >= account.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">接收邮箱</label>
                  <input
                    type="email"
                    value={receiveEmail}
                    onChange={(e) => setReceiveEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="账号密码将发送至此邮箱"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">查询密码</label>
                  <input
                    type="password"
                    value={queryPassword}
                    onChange={(e) => setQueryPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="填写便于自己记忆的查询密码"
                  />
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mr-2 rounded text-primary focus:ring-primary"
                />
                <label htmlFor="agreement" className="text-sm text-gray-600">
                  我已阅读并同意
                  <Link href="#" className="text-blue-500 hover:underline mx-1">服务协议</Link>
                  和
                  <Link href="#" className="text-blue-500 hover:underline mx-1">售后协议</Link>
                </label>
              </div>

              <div className="flex">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-6 bg-primary text-white text-base font-medium rounded-md hover:bg-primary-dark transition-colors duration-200"
                >
                  立即购买
                </button>
              </div>
            </div>
          </div>

          {/* 商品描述 */}
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">商品描述</h2>
            <div className="space-y-4 text-gray-600">
              <h3 className="font-medium">账号说明：</h3>
              <ul className="list-disc pl-5 space-y-2">
                {account.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p>所有账号经过严格测试，均可正常使用，每天都会上新。</p>
              <p>购买建议：先少量购买进行测试，再进行批量购买，批量购买自动优惠价。</p>
              
              <h3 className="font-medium mt-6">格式说明：</h3>
              <p>账号----密码----辅助邮箱</p>
              
              <h3 className="font-medium mt-6">登录网址：</h3>
              <p>{account.category}.com（包含方法登录 第三方登录不上不售后）</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountDetailPage; 