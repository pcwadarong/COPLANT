'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Counter from '@/components/common/counter';
import CustomButton from '../common/button';

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export default function Cart({ onClose }: { onClose: () => void }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleCheckout = () => {
    alert('주문이 완료되었습니다!');
  };

  const subtotal = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0,
  );

  const shipping = 3000;
  const total = subtotal + shipping;

  return (
    <div
      className="bg-yellow-50 shadow-lg p-6 w-[350px] "
      aria-label="Shopping cart contents"
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold font-english">Your Cart</p>
        <button
          aria-label="Close cart"
          onClick={onClose}
          className="text-2xl font-bold hover:text-red-500 cursor-pointer"
        >
          &times;
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-20 mb-24">
          🛒 장바구니가 비었습니다.
        </p>
      ) : (
        <>
          <ul className="space-y-4 max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <li key={item.id} className="flex gap-4 items-center relative">
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded"
                  />
                </Link>
                <div className="flex-1">
                  <Link
                    href={`/product/${item.id}`}
                    className="font-medium text-sm"
                  >
                    {item.name}
                  </Link>
                  <Counter
                    value={item.quantity}
                    onChange={(val) => updateQuantity(item.id, val)}
                  />
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-semibold text-sm whitespace-nowrap">
                    ₩{item.price.toLocaleString()}
                  </p>
                  <button
                    aria-label="Remove item"
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-400 mt-2 hover:text-red-600 cursor-pointer"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t mt-6 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>총 상품금액</span>
              <span>₩{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>배송비</span>
              <span>₩{shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>합계</span>
              <span>₩{total.toLocaleString()}</span>
            </div>
            <CustomButton
              onClick={handleCheckout}
              className="bg-green-600 text-white text-sm w-full mt-2"
            >
              구매하기
            </CustomButton>
          </div>
        </>
      )}
    </div>
  );
}
