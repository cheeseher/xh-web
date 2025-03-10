import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: 'alipay',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 如果购物车为空，重定向到购物车页面
  if (items.length === 0 && typeof window !== 'undefined') {
    router.push('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 清除错误
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }
    if (!formData.email.trim()) {
      newErrors.email = '请输入您的邮箱';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // 模拟提交订单
    setTimeout(() => {
      // 清空购物车
      clearCart();
      // 跳转到成功页面
      router.push('/checkout/success');
    }, 1500);
  };

  return (
    <Layout title="结算 - 账户商城" description="完成您的订单">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-dark mb-8">结算</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 结算表单 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">订单信息</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="请输入您的姓名"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="请输入您的邮箱"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="paymentMethod" className="block text-gray-700 mb-2">
                    支付方式
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="alipay">支付宝</option>
                    <option value="wechat">微信支付</option>
                    <option value="card">银行卡</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    href="/cart"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    返回购物车
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '处理中...' : '提交订单'}
                  </button>
                </div>
              </form>
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

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-2">订单商品</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span className="text-gray-600">
                        {item.title} x {item.quantity}
                      </span>
                      <span>¥{(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage; 