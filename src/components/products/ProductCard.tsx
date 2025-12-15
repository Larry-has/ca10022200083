'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  currency?: string;
  brand: string;
  stock: number;
  images: { url: string; isPrimary?: boolean }[];
  averageRating?: number;
  numReviews?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, loading } = useCart();

  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product._id, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-square bg-gray-100">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {/* Stock badge */}
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
              Out of Stock
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded">
              Only {product.stock} left
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>

          {/* Rating */}
          {product.numReviews && product.numReviews > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-yellow-400">★</span>
              <span className="text-sm">{product.averageRating}</span>
              <span className="text-sm text-gray-400">({product.numReviews})</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(product.price, product.currency || 'GHS')}
            </span>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || loading}
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              title={product.stock === 0 ? 'Out of stock' : 'Add to cart'}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
