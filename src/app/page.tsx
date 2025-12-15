'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { productsAPI } from '@/lib/api';
import { PRODUCT_CATEGORIES } from '@/lib/utils';

interface Product {
  _id: string;
  name: string;
  price: number;
  brand: string;
  stock: number;
  images: { url: string; isPrimary?: boolean }[];
  averageRating?: number;
  numReviews?: number;
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await productsAPI.getFeatured();
      setFeaturedProducts(data.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to GhanaTech Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Your trusted destination for quality electronics in Ghana
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-semibold">Nationwide Delivery</h3>
              <p className="text-sm text-gray-600">All 16 regions covered</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold">Mobile Money</h3>
              <p className="text-sm text-gray-600">MTN, Vodafone, AirtelTigo</p>
            </div>
            <div>
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold">Genuine Products</h3>
              <p className="text-sm text-gray-600">100% authentic items</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold">Warranty</h3>
              <p className="text-sm text-gray-600">Local warranty support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PRODUCT_CATEGORIES.slice(0, 5).map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
              >
                <div className="text-3xl mb-2">
                  {category === 'Smartphones' && '📱'}
                  {category === 'Laptops' && '💻'}
                  {category === 'Tablets' && '📱'}
                  {category === 'Accessories' && '🔌'}
                  {category === 'Audio' && '🎧'}
                </div>
                <h3 className="font-medium">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-green-600 hover:underline">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* More Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">More Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PRODUCT_CATEGORIES.slice(5).map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
              >
                <div className="text-3xl mb-2">
                  {category === 'Gaming' && '🎮'}
                  {category === 'Smart Home' && '🏠'}
                  {category === 'Wearables' && '⌚'}
                  {category === 'Cameras' && '📷'}
                  {category === 'Networking' && '📡'}
                </div>
                <h3 className="font-medium">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
