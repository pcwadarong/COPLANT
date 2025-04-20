'use client';

import { useState, useCallback } from 'react';
import Counter from '@/components/common/counter';
import CustomButton from '@/components/common/button';
import { ProductProperties } from '@/types';

export default function CartAction({
  price = 0,
  isMobile = false,
  data,
}: {
  price?: number;
  isMobile?: boolean;
  data: ProductProperties;
}) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = useCallback(() => {
    const cartItem = {
      id: data.id,
      name: data.name,
      price: data.price,
      imageUrl: data.imageUrls?.details?.[0] || '',
      quantity,
    };

    const existing = localStorage.getItem('cart');
    const cart = existing ? JSON.parse(existing) : [];

    const existingIndex = cart.findIndex(
      (item: Partial<ProductProperties>) => item.id === cartItem.id,
    );

    if (existingIndex !== -1) cart[existingIndex].quantity += cartItem.quantity;
    else cart.push(cartItem);

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('장바구니에 추가되었습니다!');
  }, [data, quantity]);

  return (
    <div className={isMobile ? 'block sm:hidden mt-10' : 'hidden sm:block'}>
      <p className="mb-4 font-bold text-xl">{`${price} 원`}</p>
      <div className={`flex gap-2 ${isMobile ? 'items-center' : 'flex-col'}`}>
        <Counter value={quantity} onChange={setQuantity} />
        <CustomButton
          onClick={handleAddToCart}
          className={`bg-stone-800 text-white text-sm ${!isMobile && 'mt-4'}`}
        >
          카트에 담기
        </CustomButton>
      </div>
      {isMobile && <hr className="border mt-5 mb-10" />}
    </div>
  );
}
