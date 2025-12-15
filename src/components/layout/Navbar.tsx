'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, Menu, X, LogOut, Package, Settings } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🇬🇭</span>
            <span className="text-xl font-bold text-green-600">GhanaTech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            <Link href="/products?category=Smartphones" className="text-gray-700 hover:text-green-600">
              Phones
            </Link>
            <Link href="/products?category=Laptops" className="text-gray-700 hover:text-green-600">
              Laptops
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-green-600">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Package className="h-4 w-4" />
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link
              href="/products"
              className="block py-2 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/products?category=Smartphones"
              className="block py-2 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Phones
            </Link>
            <Link
              href="/products?category=Laptops"
              className="block py-2 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Laptops
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
