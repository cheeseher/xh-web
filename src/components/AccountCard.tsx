import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaEnvelope, FaInstagram, FaTwitter, FaFacebook, FaDiscord, 
  FaGoogle, FaMicrosoft, FaYahoo, FaTiktok, FaRobot, 
  FaAt, FaGlobe, FaMailBulk, FaGlobeAmericas, FaGlobeEurope, FaGlobeAsia
} from 'react-icons/fa';

interface AccountCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  batchPrice?: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
  id,
  title,
  price,
  originalPrice,
  image,
  category,
  stock,
  batchPrice
}) => {
  // 根据分类获取品牌样式
  const getBrandStyle = () => {
    switch (category) {
      case 'gmail':
        return {
          icon: <FaGoogle className="text-5xl text-red-500" />,
          gradient: 'from-red-500 to-red-600',
          shadow: 'shadow-red-500/30',
          bgColor: 'bg-gray-100',
          logo: '/images/gmail.png'
        };
      case 'outlook':
        return {
          icon: <FaMicrosoft className="text-5xl text-blue-500" />,
          gradient: 'from-blue-500 to-blue-600',
          shadow: 'shadow-blue-500/30',
          bgColor: 'bg-gray-100',
          logo: '/images/outlook.png'
        };
      case 'instagram':
        return {
          icon: <FaInstagram className="text-5xl text-pink-500" />,
          gradient: 'from-pink-500 via-purple-500 to-orange-500',
          shadow: 'shadow-pink-500/30',
          bgColor: 'bg-gray-100',
          logo: '/images/instagram.png'
        };
      case 'twitter':
        return {
          icon: <FaTwitter className="text-5xl text-sky-400" />,
          gradient: 'from-sky-400 to-sky-500',
          shadow: 'shadow-sky-500/30',
          bgColor: 'bg-gray-100',
          logo: '/images/twitter.png'
        };
      case 'facebook':
        return {
          icon: <FaFacebook className="text-5xl text-blue-600" />,
          gradient: 'from-blue-600 to-blue-700',
          shadow: 'shadow-blue-600/30',
          bgColor: 'bg-gray-100',
          logo: '/images/facebook.png'
        };
      case 'discord':
        return {
          icon: <FaDiscord className="text-5xl text-indigo-500" />,
          gradient: 'from-indigo-500 to-indigo-600',
          shadow: 'shadow-indigo-500/30',
          bgColor: 'bg-gray-100',
          logo: '/images/discord.png'
        };
      case 'chatgpt':
        return {
          icon: <FaRobot className="text-5xl text-teal-500" />,
          gradient: 'from-teal-500 to-teal-600',
          shadow: 'shadow-teal-500/30',
          bgColor: 'bg-gray-100',
          logo: '/images/chatgpt.png'
        };
      case 'yahoo':
        return {
          icon: <FaYahoo className="text-5xl text-purple-500" />,
          gradient: 'from-purple-500 to-purple-600',
          shadow: 'shadow-purple-500/30',
          bgColor: 'bg-gray-100',
          logo: '/images/yahoo.png'
        };
      case 'tiktok':
        return {
          icon: <FaTiktok className="text-5xl text-gray-900" />,
          gradient: 'from-gray-900 to-black',
          shadow: 'shadow-black/30',
          bgColor: 'bg-gray-100',
          logo: '/images/tiktok.png'
        };
      case 'gmx':
        return {
          icon: <FaAt className="text-5xl text-orange-500" />,
          gradient: 'from-orange-500 to-orange-600',
          shadow: 'shadow-orange-500/30',
          bgColor: 'bg-gray-100',
          logo: '/images/gmx.png'
        };
      case 'aol':
        return {
          icon: <FaMailBulk className="text-5xl text-blue-700" />,
          gradient: 'from-blue-700 to-blue-800',
          shadow: 'shadow-blue-700/30',
          bgColor: 'bg-gray-100',
          logo: '/images/aol.png'
        };
      case 'protonmail':
        return {
          icon: <FaEnvelope className="text-5xl text-green-600" />,
          gradient: 'from-green-600 to-green-700',
          shadow: 'shadow-green-600/30',
          bgColor: 'bg-gray-100',
          logo: '/images/protonmail.png'
        };
      case 'yandex':
        return {
          icon: <FaGlobeEurope className="text-5xl text-red-600" />,
          gradient: 'from-red-600 to-red-700',
          shadow: 'shadow-red-600/30',
          bgColor: 'bg-gray-100',
          logo: '/images/yandex.png'
        };
      case 'mail':
        return {
          icon: <FaMailBulk className="text-5xl text-gray-700" />,
          gradient: 'from-gray-700 to-gray-800',
          shadow: 'shadow-gray-700/30',
          bgColor: 'bg-gray-100',
          logo: '/images/mail.png'
        };
      case 'naver':
        return {
          icon: <FaGlobeAsia className="text-5xl text-green-700" />,
          gradient: 'from-green-700 to-green-800',
          shadow: 'shadow-green-700/30',
          bgColor: 'bg-gray-100',
          logo: '/images/naver.png'
        };
      case 'rambler':
        return {
          icon: <FaGlobeEurope className="text-5xl text-blue-800" />,
          gradient: 'from-blue-800 to-blue-900',
          shadow: 'shadow-blue-800/30',
          bgColor: 'bg-gray-100',
          logo: '/images/rambler.png'
        };
      case 'german':
        return {
          icon: <FaGlobeEurope className="text-5xl text-yellow-600" />,
          gradient: 'from-yellow-600 to-yellow-700',
          shadow: 'shadow-yellow-600/30',
          bgColor: 'bg-gray-100',
          logo: '/images/german.png'
        };
      default:
        return {
          icon: <FaGlobe className="text-5xl text-gray-500" />,
          gradient: 'from-gray-500 to-gray-600',
          shadow: 'shadow-gray-500/30',
          bgColor: 'bg-gray-100',
          logo: '/images/default.png'
        };
    }
  };

  const brandStyle = getBrandStyle();

  return (
    <Link href={`/account/${id}`}>
      <div className="border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden bg-white h-full flex flex-col transform hover:-translate-y-1">
        {/* 商品图片区域 - 保持为正方形 */}
        <div className={`${brandStyle.bgColor} p-4 flex items-center justify-center aspect-square relative`}>
          {brandStyle.logo ? (
            <div className="relative w-28 h-28 transition-transform duration-300 hover:scale-110">
              <Image 
                src={brandStyle.logo} 
                alt={title}
                fill
                style={{ objectFit: 'contain' }}
                className="drop-shadow-md"
              />
            </div>
          ) : (
            <div className={`flex items-center justify-center w-20 h-20 rounded-full ${brandStyle.shadow} transition-transform duration-300 hover:scale-110`}>
              {brandStyle.icon}
            </div>
          )}
        </div>
        
        {/* 商品信息区域 */}
        <div className="p-4 flex-grow flex flex-col">
          {/* 商品标题和自动发货标签 */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-medium text-gray-800 line-clamp-2 flex-1 mr-2">
              {title}
            </h3>
            <span className="text-xs bg-[#009688] text-white px-2 py-1 rounded-md flex-shrink-0 shadow-sm">自动发货</span>
          </div>
          
          {/* 价格和库存区域 */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
            <div className="flex items-baseline space-x-2">
              <span className="text-red-500 text-xl font-bold">¥{price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">¥{originalPrice.toFixed(2)}</span>
              )}
            </div>
            <span className="text-sm text-green-600 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
              库存: {stock}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AccountCard;