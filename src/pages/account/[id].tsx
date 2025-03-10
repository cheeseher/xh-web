import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { accounts } from '../../utils/mockData';
import { FaShoppingCart, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const AccountDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

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
  };

  return (
    <Layout
      title={`${account.title} - 账户商城`}
      description={account.description}
    >
      <div className="container-custom py-12">
        {/* 返回按钮 */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <FaArrowLeft className="mr-2" /> 返回
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
              <h1 className="text-2xl font-bold text-dark mb-2">{account.title}</h1>
              <div className="flex items-center mb-4">
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                  {account.categoryName}
                </span>
                <span className="ml-4 text-gray-600">
                  库存: {account.stock} 个
                </span>
              </div>

              <p className="text-gray-700 mb-6">{account.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">账户特点:</h3>
                <ul className="space-y-2">
                  {account.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <FaCheck className="text-green-500 mr-2" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ¥{account.price.toFixed(2)}
                  </span>
                  <div className="flex items-center">
                    <span className="mr-3">数量:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 border-r border-gray-300"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(account.stock, quantity + 1))}
                        className="px-3 py-1 border-l border-gray-300"
                        disabled={quantity >= account.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className={`btn ${
                      addedToCart ? 'bg-green-500 hover:bg-green-600' : 'btn-primary'
                    } flex-1 flex items-center justify-center`}
                    disabled={addedToCart}
                  >
                    {addedToCart ? (
                      <>
                        <FaCheck className="mr-2" /> 已添加到购物车
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="mr-2" /> 添加到购物车
                      </>
                    )}
                  </button>
                  <Link
                    href="/cart"
                    className="btn bg-gray-800 text-white hover:bg-gray-900 flex-1 flex items-center justify-center"
                  >
                    立即购买
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountDetailPage; 