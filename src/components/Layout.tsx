import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import { FaInfoCircle, FaHeadset, FaTelegramPlane } from 'react-icons/fa';

interface LayoutProps {
  children: React.ReactNode;
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
        <div className="bg-gradient-to-r from-red-50 to-orange-50 py-3 border-b border-red-100">
          <div className="container-custom">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <FaInfoCircle className="text-red-500 text-lg" />
              </div>
              <div className="flex-grow">
                <p className="text-gray-700 text-sm leading-relaxed">
                  <span className="font-medium text-red-600">重要提示：</span>
                  购买本站任何商品，必须遵守各个国家法律法规及各大平台规则，非法用途一切后果自负，本站不承担任何法律及连带责任！
                </p>
                <div className="mt-1 flex items-center flex-wrap gap-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaHeadset className="text-primary mr-1" />
                    <span>售前咨询/付款问题请联系：</span>
                    <Link href="#" className="text-primary hover:text-primary-dark hover:underline mx-1 font-medium">
                      网页客服
                    </Link>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaTelegramPlane className="text-[#0088cc] mr-1" />
                    <span>购买/库存/售后问题请联系：</span>
                    <Link href="#" className="text-[#0088cc] hover:text-[#0077b5] hover:underline mx-1 font-medium">
                      飞机客服
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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