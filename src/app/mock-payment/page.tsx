'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function MockPaymentPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const amount = parseFloat(searchParams.get('amount') || '0');
  const callback = searchParams.get('callback');
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      // Redirect back to callback with reference
      if (callback) {
        const redirectUrl = `${decodeURIComponent(callback)}&reference=${reference}`;
        window.location.href = redirectUrl;
      }
    }, 2000);
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
        {/* Mock Paystack Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg mb-4">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span className="font-bold">MOCK Paystack</span>
          </div>
          <p className="text-gray-500 text-sm">Test Mode - No real payment</p>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">You are paying</p>
            <p className="text-4xl font-bold text-gray-900">{formatCurrency(amount)}</p>
            <p className="text-gray-500 text-sm mt-2">to GhanaTech Store</p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-3 mb-6">
          <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-300 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                M
              </div>
              <div>
                <p className="font-semibold">MTN Mobile Money</p>
                <p className="text-sm text-gray-500">Pay with MoMo</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 cursor-pointer opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                V
              </div>
              <div>
                <p className="font-semibold">Vodafone Cash</p>
                <p className="text-sm text-gray-500">Pay with Vodafone</p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 cursor-pointer opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                C
              </div>
              <div>
                <p className="font-semibold">Card Payment</p>
                <p className="text-sm text-gray-500">Visa / Mastercard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reference */}
        <p className="text-center text-gray-400 text-xs mb-6">
          Reference: {reference}
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handlePay}
            loading={processing}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {processing ? 'Processing Payment...' : 'Pay Now (Simulate Success)'}
          </Button>
          <button
            onClick={handleCancel}
            className="w-full py-3 text-gray-600 hover:text-gray-800"
            disabled={processing}
          >
            Cancel
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-xs text-gray-400">
            This is a mock payment page for testing purposes.
            <br />
            In production, you will be redirected to the real Paystack checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
