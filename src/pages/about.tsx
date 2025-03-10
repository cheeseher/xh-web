import React from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  return (
    <Layout title="关于我们 - 账户商城" description="了解账户商城的故事和使命">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-dark mb-8 text-center">关于我们</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-semibold mb-4">我们的故事</h2>
              <p className="text-gray-700 mb-4">
                账户商城成立于2020年，是一家专注于提供各类优质账户的在线平台。我们的创始团队拥有多年的互联网行业经验，深知用户对高质量账户的需求。
              </p>
              <p className="text-gray-700 mb-4">
                在创立之初，我们就确立了"安全、可靠、优质"的服务理念，致力于为用户提供最优质的账户和最贴心的服务。经过几年的发展，我们已经成为行业内知名的账户销售平台，拥有大量忠实用户。
              </p>
              <p className="text-gray-700">
                我们不断扩展我们的产品线，从最初的邮箱账户，到现在的社交媒体、流媒体、游戏平台等多种类型的账户，满足用户的各种需求。
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
              <div className="relative h-64 w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary">账户商城</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">我们的使命</h3>
            <p className="text-gray-600">
              为用户提供最优质的账户和最贴心的服务，让每一位用户都能轻松获取所需的账户。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">我们的价值观</h3>
            <p className="text-gray-600">
              诚信经营，用户至上，不断创新，追求卓越，为用户提供最优质的产品和服务。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">我们的愿景</h3>
            <p className="text-gray-600">
              成为全球领先的账户销售平台，为全球用户提供最优质的账户和最贴心的服务。
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">我们的团队</h2>
          <p className="text-gray-700 text-center mb-8">
            我们拥有一支专业、热情、充满创造力的团队，致力于为用户提供最优质的服务。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-500">CEO</span>
              </div>
              <h3 className="font-semibold">张三</h3>
              <p className="text-gray-600 text-sm">首席执行官</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-500">CTO</span>
              </div>
              <h3 className="font-semibold">李四</h3>
              <p className="text-gray-600 text-sm">首席技术官</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-500">COO</span>
              </div>
              <h3 className="font-semibold">王五</h3>
              <p className="text-gray-600 text-sm">首席运营官</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-500">CMO</span>
              </div>
              <h3 className="font-semibold">赵六</h3>
              <p className="text-gray-600 text-sm">首席市场官</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 