import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <Layout title="购物车 - 账户商城" description="查看您的购物车">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-dark mb-8">购物车</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <FaShoppingCart className="text-5xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              您的购物车是空的
            </h2>
            <p className="text-gray-600 mb-8">
              看起来您还没有添加任何商品到购物车。
            </p>
            <Link href="/" className="btn btn-primary">
              继续购物
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 购物车商品列表 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">商品列表</h2>
                </div>
                <ul>
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <div className="relative h-16 w-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-primary font-semibold">
                            ¥{item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-md mr-4">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              className="px-2 py-1 border-r border-gray-300"
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 border-l border-gray-300"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="删除商品"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                >
                  <FaArrowLeft className="mr-2" /> 继续购物
                </Link>
              </div>
            </div>

            {/* 订单摘要 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">订单摘要</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">商品数量</span>
                    <span>{totalItems} 件</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">商品总价</span>
                    <span>¥{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>总计</span>
                      <span className="text-primary">¥{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  结算
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage; 