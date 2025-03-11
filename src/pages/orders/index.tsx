import { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import Layout from '@/components/Layout';
import Captcha from '@/components/Captcha';
import { storage } from '@/utils/storage';

const OrdersPage = () => {
  const [email, setEmail] = useState('');
  const [queryPassword, setQueryPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // TODO: 实现订单查询逻辑
      console.log('查询订单:', email, queryPassword, captcha);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError('查询失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaRefresh = () => {
    setCaptcha('');
  };

  return (
    <Layout title="订单查询 - 星海账户">
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-6">查询订单</h1>
        
        {/* 友情提示 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="flex items-start text-gray-600">
            <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            友情提示：订单查询仅能查询最近2天的数据。
          </p>
        </div>

        {/* 查询表单 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* 邮箱 */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700">
                邮箱地址
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入下单时使用的邮箱地址"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* 查询密码 */}
            <div className="space-y-2">
              <label htmlFor="queryPassword" className="block text-gray-700">
                查询密码
              </label>
              <input
                type="password"
                id="queryPassword"
                value={queryPassword}
                onChange={(e) => setQueryPassword(e.target.value)}
                placeholder="请输入下单时设置的查询密码"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* 图形验证码 */}
            <div className="space-y-2">
              <label htmlFor="captcha" className="block text-gray-700">验证码</label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  id="captcha"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="w-48 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <Captcha onRefresh={handleCaptchaRefresh} />
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            {/* 查询按钮 */}
            <button
              type="submit"
              className="w-full px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? '查询中...' : '查询订单'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;