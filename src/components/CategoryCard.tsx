import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, count }) => {
  return (
    <Link href={`/categories/${id}`} className="block">
      <div className="card group">
        <div className="relative h-40 w-full bg-gray-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-dark">{name}</h3>
          <p className="text-sm text-gray-500">{count} 个账户</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard; 