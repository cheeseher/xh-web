import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FaSearch, FaClipboard, FaCheckCircle } from 'react-icons/fa';

const OrderQueryPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('请输入订单号');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // 模拟订单查询结果
    setTimeout(() => {
      setSearchResult({
        orderId: orderId,
        productName: '谷歌邮箱账号',
        price: 99.00,
        status: '已完成',
        createTime: '2024-03-10 15:30:45',
        payTime: '2024-03-10 15:31:22',
        account: 'example@gmail.com',
        password: '********',
      });
      setLoading(false);
    }, 800);
  };

  return (
    <Layout title="订单查询 - 账户商城" showAlert={false}>
      <div className="max-w-lg mx-auto">
        <div className="card mb-6">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">查询订单</h2>
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
                    className="input pl-10"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading mr-2"></div>
                    <span>查询中...</span>
                  </>
                ) : (
                  <>
                    <FaSearch className="mr-2" />
                    <span>查询订单</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 查询结果 */}
        {searchResult && (
          <div className="card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">订单详情</h2>
                <span className={`tag ${
                  searchResult.status === '已完成' ? 'tag-success' : 
                  searchResult.status === '处理中' ? 'tag-warning' : 'tag-danger'
                }`}>
                  {searchResult.status}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">订单号</p>
                    <p className="font-medium">{searchResult.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">商品名称</p>
                    <p className="font-medium">{searchResult.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">订单金额</p>
                    <p className="font-medium text-primary">¥{searchResult.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">创建时间</p>
                    <p className="font-medium">{searchResult.createTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">支付时间</p>
                    <p className="font-medium">{searchResult.payTime}</p>
                  </div>
                </div>

                {searchResult.status === '已完成' && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-medium mb-3">账号信息</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div>
                          <p className="text-sm text-gray-500">账号</p>
                          <p className="font-medium">{searchResult.account}</p>
                        </div>
                        <button 
                          className="text-primary hover:text-primary-dark"
                          onClick={() => navigator.clipboard.writeText(searchResult.account)}
                        >
                          <FaClipboard />
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div>
                          <p className="text-sm text-gray-500">密码</p>
                          <p className="font-medium">{searchResult.password}</p>
                        </div>
                        <button 
                          className="text-primary hover:text-primary-dark"
                          onClick={() => navigator.clipboard.writeText(searchResult.password)}
                        >
                          <FaClipboard />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 bg-green-50 p-3 rounded-md text-sm text-green-700 flex items-start">
                      <FaCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p>账号已发货，请妥善保管您的账号信息，建议立即修改密码。</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderQueryPage; 