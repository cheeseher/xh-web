import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { FaCheckCircle } from 'react-icons/fa';

const CheckoutSuccessPage: React.FC = () => {
  // 使用固定订单号
  const orderNumber = `ORD-123456`;

  return (
    <Layout title="订单成功 - 账户商城" description="您的订单已成功提交">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-6xl text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-dark mb-4">订单提交成功！</h1>
          <p className="text-gray-600 mb-6">
            感谢您的购买。您的订单已成功提交，我们将尽快处理。
          </p>
          <div className="bg-gray-50 p-4 rounded-md mb-8">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">订单号：</span> {orderNumber}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">订单状态：</span>{' '}
              <span className="text-green-500">已支付</span>
            </p>
          </div>
          <p className="text-gray-600 mb-8">
            我们已将订单确认和账户信息发送到您的邮箱，请注意查收。
            如有任何问题，请随时联系我们的客服。
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link href="/" className="btn btn-primary">
              返回首页
            </Link>
            <Link href="/account" className="btn bg-gray-800 text-white hover:bg-gray-900">
              查看我的账户
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccessPage; 