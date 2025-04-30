'use client';

import { useCallback, useState } from 'react';

import CustomButton from '@/components/common/button';
import Counter from '@/components/common/counter';
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

    const storedCartItemsJson = localStorage.getItem('cart');
    const parsedCartItems = storedCartItemsJson
      ? JSON.parse(storedCartItemsJson)
      : [];

    const itemIndex = parsedCartItems.findIndex(
      (item: Partial<ProductProperties>) => item.id === cartItem.id,
    );

    if (itemIndex !== -1) {
      parsedCartItems[itemIndex].quantity += cartItem.quantity;
    } else {
      parsedCartItems.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(parsedCartItems));
    alert('장바구니에 추가되었습니다!');
  }, [data, quantity]);

  return (
    <div className={isMobile ? 'block sm:hidden mt-10' : 'hidden sm:block'}>
      <p className="mb-4 font-bold text-xl">{`${price} 원`}</p>
      <div className={`flex gap-2 ${isMobile ? 'items-center' : 'flex-col'}`}>
        <Counter value={quantity} onChange={setQuantity} />
        <CustomButton
          onClick={handleAddToCart}
          aria-label="장바구니에 상품 담기"
          className={`bg-stone-800 text-white text-sm ${
            !isMobile ? 'mt-4' : ''
          }`}
        >
          카트에 담기
        </CustomButton>
      </div>
      {isMobile && <hr className="border mt-5 mb-10" />}
    </div>
  );
}
