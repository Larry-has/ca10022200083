import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🇬🇭</span>
              <span className="text-xl font-bold text-white">GhanaTech</span>
            </div>
            <p className="text-sm">
              Your trusted destination for quality electronics in Ghana. Genuine products, nationwide delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-white">All Products</Link>
              </li>
              <li>
                <Link href="/products?category=Smartphones" className="hover:text-white">Smartphones</Link>
              </li>
              <li>
                <Link href="/products?category=Laptops" className="hover:text-white">Laptops</Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="hover:text-white">Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/orders" className="hover:text-white">Track Order</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white">Shopping Cart</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white">My Account</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 Accra, Ghana</li>
              <li>📞 +233 24 123 4567</li>
              <li>✉️ support@ghanatech.com</li>
            </ul>
            <div className="mt-4">
              <p className="text-sm mb-2">We Accept:</p>
              <div className="flex gap-2">
                <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs">MTN MoMo</span>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">Vodafone</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} GhanaTech Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
