import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
interface ProductParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

interface OrderParams {
  page?: number;
  limit?: number;
  status?: string;
}

interface UserParams {
  page?: number;
  limit?: number;
  role?: string;
}

interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
}

interface OrderData {
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    region: string;
    gpsAddress?: string;
  };
  paymentMethod: string;
  deliveryMethod: string;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images?: { url: string; alt?: string; isPrimary?: boolean }[];
  isFeatured?: boolean;
  isActive?: boolean;
}

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; phone: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: ProfileData) => api.put('/auth/me', data),
};

// Products API
export const productsAPI = {
  getAll: (params?: ProductParams) => api.get('/products', { params }),
  getFeatured: () => api.get('/products/featured'),
  getCategories: () => api.get('/products/categories'),
  getById: (id: string) => api.get(`/products/${id}`),
  getRelated: (id: string) => api.get(`/products/${id}/related`),
  addReview: (id: string, data: { rating: number; comment: string }) =>
    api.post(`/products/${id}/reviews`, data),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (productId: string, quantity: number) =>
    api.post('/cart', { productId, quantity }),
  update: (productId: string, quantity: number) =>
    api.put(`/cart/${productId}`, { quantity }),
  remove: (productId: string) => api.delete(`/cart/${productId}`),
  clear: () => api.delete('/cart'),
};

// Orders API
export const ordersAPI = {
  create: (data: OrderData) => api.post('/orders', data),
  getAll: (params?: OrderParams) => api.get('/orders', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
  cancel: (id: string) => api.post(`/orders/${id}/cancel`),
};

// Payments API
export const paymentsAPI = {
  initialize: (orderId: string) => api.post('/payments/initialize', { orderId }),
  verify: (reference: string) => api.get(`/payments/verify/${reference}`),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  createProduct: (data: ProductData) => api.post('/admin/products', data),
  updateProduct: (id: string, data: Partial<ProductData>) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/admin/products/${id}`),
  getOrders: (params?: OrderParams) => api.get('/admin/orders', { params }),
  updateOrderStatus: (id: string, data: { status: string; note?: string }) =>
    api.put(`/admin/orders/${id}`, data),
  getUsers: (params?: UserParams) => api.get('/admin/users', { params }),
  toggleUserStatus: (id: string) => api.put(`/admin/users/${id}`),
};

export default api;
