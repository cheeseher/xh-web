import React from 'react';
import Link from 'next/link';
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
          shadow: 'shadow-red-500/30'
        };
      case 'outlook':
        return {
          icon: <FaMicrosoft className="text-5xl text-blue-500" />,
          gradient: 'from-blue-500 to-blue-600',
          shadow: 'shadow-blue-500/30'
        };
      case 'instagram':
        return {
          icon: <FaInstagram className="text-5xl text-pink-500" />,
          gradient: 'from-pink-500 via-purple-500 to-orange-500',
          shadow: 'shadow-pink-500/30'
        };
      case 'twitter':
        return {
          icon: <FaTwitter className="text-5xl text-sky-400" />,
          gradient: 'from-sky-400 to-sky-500',
          shadow: 'shadow-sky-500/30'
        };
      case 'facebook':
        return {
          icon: <FaFacebook className="text-5xl text-blue-600" />,
          gradient: 'from-blue-600 to-blue-700',
          shadow: 'shadow-blue-600/30'
        };
      case 'discord':
        return {
          icon: <FaDiscord className="text-5xl text-indigo-500" />,
          gradient: 'from-indigo-500 to-indigo-600',
          shadow: 'shadow-indigo-500/30'
        };
      case 'chatgpt':
        return {
          icon: <FaRobot className="text-5xl text-teal-500" />,
          gradient: 'from-teal-500 to-teal-600',
          shadow: 'shadow-teal-500/30'
        };
      case 'yahoo':
        return {
          icon: <FaYahoo className="text-5xl text-purple-500" />,
          gradient: 'from-purple-500 to-purple-600',
          shadow: 'shadow-purple-500/30'
        };
      case 'tiktok':
        return {
          icon: <FaTiktok className="text-5xl text-gray-900" />,
          gradient: 'from-gray-900 to-black',
          shadow: 'shadow-black/30'
        };
      case 'gmx':
        return {
          icon: <FaAt className="text-5xl text-orange-500" />,
          gradient: 'from-orange-500 to-orange-600',
          shadow: 'shadow-orange-500/30'
        };
      case 'aol':
        return {
          icon: <FaMailBulk className="text-5xl text-blue-700" />,
          gradient: 'from-blue-700 to-blue-800',
          shadow: 'shadow-blue-700/30'
        };
      case 'protonmail':
        return {
          icon: <FaEnvelope className="text-5xl text-green-600" />,
          gradient: 'from-green-600 to-green-700',
          shadow: 'shadow-green-600/30'
        };
      case 'yandex':
        return {
          icon: <FaGlobeEurope className="text-5xl text-red-600" />,
          gradient: 'from-red-600 to-red-700',
          shadow: 'shadow-red-600/30'
        };
      case 'mail':
        return {
          icon: <FaMailBulk className="text-5xl text-gray-700" />,
          gradient: 'from-gray-700 to-gray-800',
          shadow: 'shadow-gray-700/30'
        };
      case 'naver':
        return {
          icon: <FaGlobeAsia className="text-5xl text-green-700" />,
          gradient: 'from-green-700 to-green-800',
          shadow: 'shadow-green-700/30'
        };
      case 'rambler':
        return {
          icon: <FaGlobeEurope className="text-5xl text-blue-800" />,
          gradient: 'from-blue-800 to-blue-900',
          shadow: 'shadow-blue-800/30'
        };
      case 'german':
        return {
          icon: <FaGlobeEurope className="text-5xl text-yellow-600" />,
          gradient: 'from-yellow-600 to-yellow-700',
          shadow: 'shadow-yellow-600/30'
        };
      default:
        return {
          icon: <FaGlobe className="text-5xl text-gray-500" />,
          gradient: 'from-gray-500 to-gray-600',
          shadow: 'shadow-gray-500/30'
        };
    }
  };

  const brandStyle = getBrandStyle();

  return (
    <Link href={`/account/${id}`}>
      <div className="border border-gray-100 rounded-lg hover:shadow-md transition-all duration-300">
        <div className="h-32 w-full flex items-center justify-center p-2 relative overflow-hidden group">
          <div className={`relative flex items-center justify-center w-24 h-24 rounded-full ${brandStyle.shadow} transform group-hover:scale-110 transition-all duration-300`}>
            {brandStyle.icon}
          </div>
          {stock > 0 ? (
            <div className="absolute top-2 right-2 bg-batch-price-light text-batch-price text-xs px-2 py-1 rounded-full">
              充足
            </div>
          ) : (
            <div className="absolute top-2 right-2 bg-price-light text-price text-xs px-2 py-1 rounded-full">
              缺货
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-800 truncate">{title}</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">自动发货</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-price">¥{price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-xs text-gray-400 line-through">¥{originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">库存: {stock}</span>
          </div>
          {batchPrice && (
            <div className="mt-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded inline-block">
              批发：≥500个 {batchPrice}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AccountCard;