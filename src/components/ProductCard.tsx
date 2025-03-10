import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

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
}) => {
  return (
    <div className="product-card group">
      {/* 商品图片 */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <Link href={`/products/${id}`}>
          <div className="aspect-w-1 aspect-h-1">
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Link>
        {stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium text-lg">已售罄</span>
          </div>
        )}
        {originalPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            省¥{(originalPrice - price).toFixed(2)}
          </div>
        )}
      </div>

      {/* 商品信息 */}
      <div className="flex-grow">
        <Link href={`/products/${id}`}>
          <h3 className="product-card-title line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</p>
        
        {/* 评分和销量 */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center text-yellow-400">
            <FaStar />
            <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-600">已售 {sales}</span>
        </div>

        {/* 价格和购买按钮 */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="product-card-price">¥{price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">¥{originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button 
            className={`btn ${stock > 0 ? 'btn-primary' : 'btn-outline cursor-not-allowed'}`}
            disabled={stock <= 0}
          >
            <FaShoppingCart className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 