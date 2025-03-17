import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const ThirdPartyPaymentPage: React.FC = () => {
  const router = useRouter();
  const { method, orderId, amount } = router.query;

  return (
    <Layout title="第三方支付 - 星海账户" hidePageTitle={true}>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">第三方支付页面</h1>
          <p className="text-gray-500">
            订单号: {orderId}
            <br />
            金额: ¥{amount}
            <br />
            支付方式: {method}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ThirdPartyPaymentPage; 