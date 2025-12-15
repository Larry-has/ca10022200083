'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ordersAPI } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Package } from 'lucide-react';

interface Order {
  _id: string;
  orderNumber: string;
  items: { name: string; quantity: number }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data } = await ordersAPI.getAll();
      setOrders(data.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
        <Link
          href="/products"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order._id}
            href={`/orders/${order._id}`}
            className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-lg">{order.orderNumber}</p>
                <p className="text-gray-600">{formatDate(order.createdAt)}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {order.items.length} item(s)
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
