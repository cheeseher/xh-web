import React from 'react';
import Link from 'next/link';
import { FaEnvelope, FaInstagram, FaTwitter, FaFacebook, FaDiscord, FaSpotify, FaPlay, FaSteam, FaGoogle, FaMicrosoft } from 'react-icons/fa';

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
  // 根据标题或ID确定使用哪个图标
  const getIcon = () => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('gmail')) {
      return <FaGoogle className="text-3xl text-red-500" />;
    } else if (titleLower.includes('outlook') || titleLower.includes('office')) {
      return <FaMicrosoft className="text-3xl text-blue-500" />;
    } else if (titleLower.includes('instagram')) {
      return <FaInstagram className="text-3xl text-pink-500" />;
    } else if (titleLower.includes('twitter')) {
      return <FaTwitter className="text-3xl text-blue-400" />;
    } else if (titleLower.includes('facebook')) {
      return <FaFacebook className="text-3xl text-blue-600" />;
    } else if (titleLower.includes('discord')) {
      return <FaDiscord className="text-3xl text-indigo-500" />;
    } else if (titleLower.includes('spotify')) {
      return <FaSpotify className="text-3xl text-green-500" />;
    } else if (titleLower.includes('netflix')) {
      return <FaPlay className="text-3xl text-red-600" />;
    } else if (titleLower.includes('steam')) {
      return <FaSteam className="text-3xl text-gray-700" />;
    } else {
      return <FaEnvelope className="text-3xl text-gray-500" />;
    }
  };

  return (
    <Link href={`/account/${id}`}>
      <div className="bg-white border border-gray-100 rounded hover:shadow-sm transition-all duration-300">
        <div className="h-32 w-full flex items-center justify-center p-2">
          {getIcon()}
        </div>
        <div className="p-2 border-t border-gray-100">
          <h3 className="text-xs font-medium text-gray-800 mb-1 truncate">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-primary font-bold">¥{price.toFixed(2)}</span>
            <span className="text-xs text-gray-400">库存: {stock}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AccountCard; 