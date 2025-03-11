import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import { FaInfoCircle, FaHeadset, FaTelegramPlane, FaTimes } from 'react-icons/fa';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showAlert?: boolean;
  hidePageTitle?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = '星海账户 - 优质账户销售平台',
  description = '提供各类优质账户，包括邮箱、社交媒体、流媒体等，安全可靠，价格合理。',
  showAlert = true,
  hidePageTitle = false,
}) => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const [showTip, setShowTip] = useState(true);

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
        
        {/* 只在首页显示提示信息 - 新设计 */}
        {isHomePage && showAlert && showTip && (
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="container-custom py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <FaInfoCircle className="text-primary text-sm flex-shrink-0" />
                  <p className="text-gray-700 text-xs md:text-sm truncate">
                    <span className="font-medium text-primary">提示：</span>
                    购买本站商品须遵守法律法规及平台规则，非法用途后果自负
                  </p>
                </div>
                <div className="flex items-center space-x-3 ml-2">
                  <div className="hidden md:flex items-center">
                    <Link href="#" className="text-xs text-gray-600 hover:text-primary flex items-center">
                      <FaHeadset className="text-primary mr-1 text-xs" />
                      <span>网页客服</span>
                    </Link>
                    <span className="mx-2 text-gray-300">|</span>
                    <Link href="#" className="text-xs text-gray-600 hover:text-[#0088cc] flex items-center">
                      <FaTelegramPlane className="text-[#0088cc] mr-1 text-xs" />
                      <span>飞机客服</span>
                    </Link>
                  </div>
                  <button 
                    onClick={() => setShowTip(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="关闭提示"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 页面标题 - 非首页显示，且hidePageTitle为false时显示 */}
        {!isHomePage && !hidePageTitle && (
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