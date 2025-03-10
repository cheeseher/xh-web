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
  image: string;
  category: string;
  stock: number;
}

const AccountCard: React.FC<AccountCardProps> = ({
  id,
  title,
  price,
  image,
  category,
  stock,
}) => {
  // 根据分类确定使用哪个图标
  const getIcon = () => {
    switch (category) {
      case 'gmail':
        return <FaGoogle className="text-3xl text-red-500" />;
      case 'outlook':
        return <FaMicrosoft className="text-3xl text-blue-500" />;
      case 'instagram':
        return <FaInstagram className="text-3xl text-pink-500" />;
      case 'twitter':
        return <FaTwitter className="text-3xl text-blue-400" />;
      case 'facebook':
        return <FaFacebook className="text-3xl text-blue-600" />;
      case 'discord':
        return <FaDiscord className="text-3xl text-indigo-500" />;
      case 'chatgpt':
        return <FaRobot className="text-3xl text-green-500" />;
      case 'yahoo':
        return <FaYahoo className="text-3xl text-purple-600" />;
      case 'tiktok':
        return <FaTiktok className="text-3xl text-black" />;
      case 'gmx':
        return <FaAt className="text-3xl text-orange-500" />;
      case 'aol':
        return <FaMailBulk className="text-3xl text-blue-700" />;
      case 'protonmail':
        return <FaEnvelope className="text-3xl text-green-600" />;
      case 'yandex':
        return <FaGlobeEurope className="text-3xl text-red-600" />;
      case 'mail':
        return <FaMailBulk className="text-3xl text-gray-700" />;
      case 'naver':
        return <FaGlobeAsia className="text-3xl text-green-700" />;
      case 'rambler':
        return <FaGlobeEurope className="text-3xl text-blue-800" />;
      case 'german':
        return <FaGlobeEurope className="text-3xl text-yellow-600" />;
      case 'other':
        return <FaGlobe className="text-3xl text-gray-500" />;
      default:
        return <FaEnvelope className="text-3xl text-gray-500" />;
    }
  };

  return (
    <Link href={`/account/${id}`}>
      <div className="bg-white border border-gray-100 rounded-md hover:shadow-md transition-all duration-300">
        <div className="h-32 w-full flex items-center justify-center p-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-75"></div>
          <div className="relative transform group-hover:scale-110 transition-transform duration-300 ease-in-out">
            {getIcon()}
          </div>
          <div className="absolute top-2 right-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium shadow-sm">
            充足
          </div>
        </div>
        <div className="p-3 border-t border-gray-100">
          <h3 className="text-xs font-medium text-gray-800 mb-2 truncate">{title}</h3>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-red-500 font-bold">¥{price.toFixed(2)}</span>
              <span className="text-xs text-gray-400 line-through ml-1">¥{(price * 1.5).toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs bg-green-100 text-green-600 px-1 py-0.5 rounded">自动发货</span>
            <span className="text-xs text-gray-500">库存: {stock}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AccountCard;