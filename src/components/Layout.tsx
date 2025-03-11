import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import { FaInfoCircle, FaHeadset, FaTelegramPlane } from 'react-icons/fa';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showAlert?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = '星海账户 - 优质账户销售平台',
  description = '提供各类优质账户，包括邮箱、社交媒体、流媒体等，安全可靠，价格合理。',
  showAlert = true,
}) => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

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
        
        {/* 只在首页显示提示信息 */}
        {isHomePage && showAlert && (
          <div className="bg-white rounded-lg border border-gray-100 overflow-hidden container-custom my-6">
            <div className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="text-primary text-xl" />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-medium text-primary">重要提示：</span>
                    购买本站任何商品，必须遵守各个国家法律法规及各大平台规则，非法用途一切后果自负，本站不承担任何法律及连带责任！
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                      <FaHeadset className="text-primary mr-2" />
                      <span>售前咨询/付款问题请联系：</span>
                      <Link href="#" className="text-primary hover:text-primary-dark hover:underline ml-1 font-medium">
                        网页客服
                      </Link>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                      <FaTelegramPlane className="text-[#0088cc] mr-2" />
                      <span>购买/库存/售后问题请联系：</span>
                      <Link href="#" className="text-[#0088cc] hover:text-[#0077b5] hover:underline ml-1 font-medium">
                        飞机客服
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 页面标题 - 非首页显示 */}
        {!isHomePage && (
          <div className="bg-white border-b">
            <div className="container-custom py-4">
              <h1 className="text-xl font-bold text-gray-800">{title.split(' - ')[0]}</h1>
            </div>
          </div>
        )}
        
        <main className="flex-grow bg-gray-50">
          <div className={!isHomePage ? 'container-custom py-6' : ''}>
            {children}
          </div>
        </main>
        
        <FloatingButtons />
        <Footer />
      </div>
    </>
  );
};

export default Layout;