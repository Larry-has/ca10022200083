'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { adminAPI } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Users, Package, ShoppingCart, DollarSign, Plus } from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
}

interface RecentOrder {
  _id: string;
  orderNumber: string;
  user: { name: string; email: string };
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to finish loading before checking
    if (authLoading) return;

    if (!user || !isAdmin) {
      router.push('/login');
      return;
    }
    fetchDashboard();
  }, [user, isAdmin, authLoading]);

  const fetchDashboard = async () => {
    try {
      const { data } = await adminAPI.getDashboard();
      setStats(data.data.stats);
      setRecentOrders(data.data.recentOrders);
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/admin/products"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-2">Manage Products</h3>
          <p className="text-gray-600">Add, edit, or remove products</p>
        </Link>
        <Link
          href="/admin/orders"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-2">Manage Orders</h3>
          <p className="text-gray-600">View and update order status</p>
        </Link>
        <Link
          href="/admin/users"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-2">Manage Users</h3>
          <p className="text-gray-600">View customer accounts</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-green-600 hover:underline">
              View All
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                  <td className="px-6 py-4">{order.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4">{formatCurrency(order.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
