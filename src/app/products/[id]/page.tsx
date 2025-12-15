'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Minus, Plus, Star } from 'lucide-react';
import { productsAPI } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import ProductCard from '@/components/products/ProductCard';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  brand: string;
  category: string;
  stock: number;
  images: { url: string; isPrimary?: boolean }[];
  specifications?: Record<string, string>;
  averageRating: number;
  numReviews: number;
  reviews: {
    user: { name: string };
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, loading: cartLoading } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchRelatedProducts();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await productsAPI.getById(id as string);
      setProduct(data.data.product);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const { data } = await productsAPI.getRelated(id as string);
      setRelatedProducts(data.data.products);
    } catch (error) {
      console.error('Failed to fetch related products:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 aspect-square rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
              <div className="bg-gray-200 h-32 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            {product.images?.[selectedImage] ? (
              <Image
                src={product.images[selectedImage].url}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-green-500' : 'border-transparent'
                  }`}
                >
                  <Image src={image.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-gray-500 mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          {product.numReviews > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(product.averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.averageRating} ({product.numReviews} reviews)
              </span>
            </div>
          )}

          <p className="text-3xl font-bold text-green-600 mb-4">
            {formatCurrency(product.price, product.currency)}
          </p>

          {/* Stock Status */}
          <div className="mb-4">
            {product.stock === 0 ? (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            ) : product.stock <= 5 ? (
              <span className="text-yellow-600 font-semibold">
                Only {product.stock} left in stock!
              </span>
            ) : (
              <span className="text-green-600 font-semibold">In Stock</span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Quantity and Add to Cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          )}

          {/* Category */}
          <p className="text-gray-500">
            Category: <span className="text-gray-700">{product.category}</span>
          </p>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{review.user.name}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
