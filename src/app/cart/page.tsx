'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartItem from '@/components/cart/CartItem';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const { cart, loading, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Please login</h2>
        <p className="text-gray-600 mb-6">Login to view your cart</p>
        <Link
          href="/login"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Login
        </Link>
      </div>
    );
  }

  if (loading && !cart) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">Loading cart...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Add some products to your cart to continue shopping
        </p>
        <Link
          href="/products"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                <span>{formatCurrency(cart.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">{formatCurrency(cart.totalPrice)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="block w-full text-center mt-4 text-green-600 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
