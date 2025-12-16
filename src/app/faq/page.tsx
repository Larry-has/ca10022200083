'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept MTN Mobile Money, Vodafone Cash, AirtelTigo Money, and major credit/debit cards (Visa, Mastercard). You can also choose Cash on Delivery for orders within Accra.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery within Accra takes 1-2 business days. For other regions in Ghana, delivery typically takes 3-5 business days. Express delivery options are available for urgent orders.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy for all products. Items must be unused and in their original packaging. Contact our customer service to initiate a return.'
  },
  {
    question: 'Are all products genuine?',
    answer: 'Yes! We only sell 100% genuine products sourced directly from authorized distributors. All electronics come with manufacturer warranty.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is confirmed, you can track it by logging into your account and visiting the "My Orders" section. You will also receive SMS updates on your delivery status.'
  },
  {
    question: 'Do you offer warranty on products?',
    answer: 'Yes, all our products come with manufacturer warranty. Smartphones and laptops typically have 1-year warranty, while accessories have 3-6 months warranty.'
  },
  {
    question: 'Can I cancel my order?',
    answer: 'Orders can be cancelled within 1 hour of placement if they have not been processed. Once an order is being prepared for shipping, it cannot be cancelled.'
  },
  {
    question: 'Do you deliver nationwide?',
    answer: 'Yes, we deliver to all regions in Ghana. Delivery fees vary based on location. Free delivery is available for orders above GHS 500 within Accra.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-8">Find answers to common questions about our products and services.</p>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow border">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-green-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center bg-green-50 rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
        <p className="text-gray-600 mb-4">Our customer support team is here to help!</p>
        <div className="flex justify-center gap-4">
          <a href="tel:+233241234567" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Call Us
          </a>
          <a href="mailto:support@ghanatech.com" className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50">
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
