import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import Link from 'next/link';
import { FaInfoCircle } from 'react-icons/fa';
import FloatingButtons from './FloatingButtons';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = '账户商城 - 优质账户销售平台',
  description = '提供各类优质账户，包括邮箱、社交媒体、流媒体等，安全可靠，价格合理。',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="bg-gray-100 py-2 px-4 text-sm text-gray-700 border-b border-gray-200">
          <div className="container-custom flex items-center">
            <FaInfoCircle className="text-red-500 mr-2 flex-shrink-0" />
            <p>
              购买本站任何商品，必须遵守各个国家法律法规及各大平台规则，非法用途一切后果自负，本站不承担任何法律及连带责任！
              售前咨询/付款等问题联系系统：
              <Link href="#" className="text-blue-500 hover:underline mx-1">网页客服</Link>
              （右下角图标），购买/库存/售后问题可联系：
              <Link href="#" className="text-blue-500 hover:underline mx-1">飞机客服</Link>
            </p>
          </div>
        </div>
        <main className="flex-grow">{children}</main>
        <FloatingButtons />
        <Footer />
      </div>
    </>
  );
};

export default Layout; 