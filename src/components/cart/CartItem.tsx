'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
  item: {
    product: {
      _id: string;
      name: string;
      price: number;
      images: { url: string }[];
    };
    quantity: number;
    price: number;
  };
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow">
      <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {item.product.images?.[0] ? (
          <Image
            src={item.product.images[0].url}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
        <p className="text-green-600 font-bold mt-1">
          {formatCurrency(item.price)}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.product._id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}
