import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaShoppingCart, FaGoogle, FaMicrosoft, FaInstagram, FaTwitter, FaFacebook, FaDiscord, FaRobot, FaYahoo, FaTiktok, FaAt, FaMailBulk, FaEnvelope, FaGlobeEurope, FaGlobe, FaGlobeAsia } from 'react-icons/fa';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  sales: number;
  rating: number;
  stock: number;
  category?: string;
  batchPrice?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  originalPrice,
  description,
  image,
  sales,
  rating,
  stock,
  category = 'other',
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
    <div className="bg-white border border-gray-100 rounded-lg hover:shadow-md transition-all duration-300">
      <Link href={`/products/${id}`}>
        <div className="h-32 w-full flex items-center justify-center p-2 relative overflow-hidden group">
          <div className={`relative flex items-center justify-center w-24 h-24 bg-white rounded-full ${brandStyle.shadow} transform group-hover:scale-110 transition-all duration-300`}>
            {brandStyle.icon}
          </div>
          {stock > 0 ? (
            <div className="absolute top-2 right-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
              充足
            </div>
          ) : (
            <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
              缺货
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-800 mb-2 truncate">{title}</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-red-500">¥{price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-xs text-gray-400 line-through">¥{originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center text-yellow-400 text-sm">
              <FaStar />
              <span className="ml-1 text-gray-600">{rating.toFixed(1)}</span>
              <span className="mx-1 text-gray-300">|</span>
              <span className="text-gray-600">已售 {sales}</span>
            </div>
            <span className="text-xs text-[#009688]">库存: {stock}</span>
          </div>
          {batchPrice && (
            <div className="mt-1 text-xs text-blue-600">
              批发：{batchPrice}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;