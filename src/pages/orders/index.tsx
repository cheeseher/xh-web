import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { FaInfoCircle } from 'react-icons/fa';
import Captcha from '@/components/Captcha';

const OrdersPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [captcha, setCaptcha] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现订单查询逻辑
    console.log('查询订单:', orderNumber, captcha);
  };

  const handleCaptchaRefresh = () => {
    setCaptcha('');
  };

  return (
    <Layout title="订单查询 - 很多号">
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-6">查询订单</h1>
        
        {/* 友情提示 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="flex items-start text-gray-600">
            <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            友情提示：订单查询仅能查询最近天的数据；移动端模式下，仅能查询最近一笔订单。
          </p>
        </div>

        {/* 查询表单 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-4">
            {/* 浏览器提示 */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 min-w-[80px]">浏览器提示</span>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                  测试器运行
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                  联系方式
                </button>
              </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              {/* 订单号 */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 min-w-[80px]">订单号</span>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="只有下单的地址才能通过订单号进行查询"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* 图形验证 */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 min-w-[80px]">图形验证</span>
                <input
                  type="text"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="w-48 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Captcha onRefresh={handleCaptchaRefresh} />
              </div>

              {/* 查询按钮 */}
              <div className="flex items-center space-x-4">
                <span className="min-w-[80px]"></span>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                >
                  查询
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage; 