'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

interface MobileMoneyPaymentProps {
  amount: number;
  onSuccess: (data: { transactionId: string }) => void;
  onError: (error: string) => void;
}

const providers = {
  mtn: {
    name: 'MTN MoMo',
    color: 'bg-yellow-400',
    textColor: 'text-black',
    prefixes: ['024', '054', '055', '059'],
  },
  vodafone: {
    name: 'Vodafone Cash',
    color: 'bg-red-600',
    textColor: 'text-white',
    prefixes: ['020', '050'],
  },
  airteltigo: {
    name: 'AirtelTigo Money',
    color: 'bg-blue-600',
    textColor: 'text-white',
    prefixes: ['027', '057', '026', '056'],
  },
};

export default function MobileMoneyPayment({
  amount,
  onSuccess,
  onError,
}: MobileMoneyPaymentProps) {
  const [phone, setPhone] = useState('');
  const [detectedProvider, setDetectedProvider] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'waiting' | 'success' | 'failed'>(
    'idle'
  );
  const [countdown, setCountdown] = useState(300);

  // Auto-detect provider based on phone number
  useEffect(() => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length >= 3) {
      const prefix = cleaned.startsWith('233') ? cleaned.slice(3, 6) : cleaned.slice(0, 3);

      for (const [key, provider] of Object.entries(providers)) {
        if (provider.prefixes.some((p) => prefix.startsWith(p.slice(1)))) {
          setDetectedProvider(key);
          return;
        }
      }
    }
    setDetectedProvider(null);
  }, [phone]);

  // Countdown timer when waiting for approval
  useEffect(() => {
    if (status === 'waiting' && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0 && status === 'waiting') {
      setStatus('failed');
      onError('Payment timeout. Please try again.');
    }
  }, [status, countdown, onError]);

  const initiatePayment = async () => {
    setStatus('processing');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus('waiting');
      setCountdown(300);

      // Simulate checking for payment (in real app, this would poll the backend)
      setTimeout(() => {
        setStatus('success');
        onSuccess({ transactionId: `TXN-${Date.now()}` });
      }, 5000);
    } catch (error) {
      setStatus('failed');
      onError('Payment failed. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const provider = detectedProvider ? providers[detectedProvider as keyof typeof providers] : null;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Mobile Money Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="024 XXX XXXX"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          disabled={status !== 'idle'}
        />
        {provider && (
          <div className="mt-2 flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${provider.color}`}></span>
            <span className="text-sm text-gray-600">{provider.name} detected</span>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Amount to pay:</p>
        <p className="text-2xl font-bold text-green-600">{formatCurrency(amount, 'GHS')}</p>
      </div>

      {status === 'waiting' && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
          <div className="animate-pulse mb-2">
            <span className="text-4xl">📱</span>
          </div>
          <p className="font-semibold">Check your phone!</p>
          <p className="text-sm text-gray-600 mb-2">
            Approve the payment request on your {provider?.name}
          </p>
          <p className="text-lg font-mono text-gray-800">
            Time remaining: {formatTime(countdown)}
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
          <span className="text-4xl">✅</span>
          <p className="font-semibold text-green-700">Payment Successful!</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
          <span className="text-4xl">❌</span>
          <p className="font-semibold text-red-700">Payment Failed</p>
          <button onClick={() => setStatus('idle')} className="mt-2 text-red-600 underline">
            Try again
          </button>
        </div>
      )}

      {status === 'idle' && (
        <button
          onClick={initiatePayment}
          disabled={!provider || phone.replace(/\D/g, '').length < 10}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Pay with {provider?.name || 'Mobile Money'}
        </button>
      )}

      {status === 'processing' && (
        <button disabled className="w-full bg-gray-400 text-white py-3 rounded-lg">
          <span className="animate-spin inline-block mr-2">⏳</span>
          Processing...
        </button>
      )}

      {/* Provider Selection */}
      {status === 'idle' && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-3">Supported providers:</p>
          <div className="flex gap-2">
            {Object.entries(providers).map(([key, p]) => (
              <div
                key={key}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${p.color} ${p.textColor}`}
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
