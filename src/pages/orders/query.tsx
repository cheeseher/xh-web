import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FaSearch } from 'react-icons/fa';

const OrderQueryPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('请输入订单号');
      return;
    }
    
    // 模拟订单查询结果
    setSearchResult({
      orderId: orderId,
      productName: '谷歌邮箱账号',
      price: 99.00,
      status: '已完成',
      createTime: '2024-03-10 15:30:45',
      payTime: '2024-03-10 15:31:22',
    });
    setError('');
  };

  return (
    <Layout title="订单查询 - 账户商城">
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 头部 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
              <h1 className="text-2xl font-bold">订单查询</h1>
              <p className="mt-2 text-white/80">输入订单号查询订单详情</p>
            </div>

            {/* 查询表单 */}
            <div className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                    订单号
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="orderId"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="请输入您的订单号"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                  </div>
                  {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <FaSearch className="mr-2" />
                  查询订单
                </button>
              </form>

              {/* 查询结果 */}
              {searchResult && (
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">查询结果</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">订单号</dt>
                        <dd className="text-sm font-medium text-gray-900">{searchResult.orderId}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">商品名称</dt>
                        <dd className="text-sm font-medium text-gray-900">{searchResult.productName}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">订单金额</dt>
                        <dd className="text-sm font-medium text-primary">¥{searchResult.price.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">订单状态</dt>
                        <dd className="text-sm font-medium text-green-600">{searchResult.status}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">创建时间</dt>
                        <dd className="text-sm font-medium text-gray-900">{searchResult.createTime}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">支付时间</dt>
                        <dd className="text-sm font-medium text-gray-900">{searchResult.payTime}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderQueryPage; 