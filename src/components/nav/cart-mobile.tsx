'use client';

import { UseLockBodyScroll } from '@/hooks/useLockBodyScroll';

import Cart from './cart';

export default function CartMobile({ onClose }: { onClose: () => void }) {
  UseLockBodyScroll(true);

  return (
    <div className="fixed inset-0 mt-15 z-100 xs:hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl"
        aria-label="장바구니 닫기"
      >
        ×
      </button>

      <Cart />
    </div>
  );
}
