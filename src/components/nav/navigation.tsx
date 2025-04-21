'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import Cart from './cart';
import HamburgerMenu from './hamburger';

import { UseLockBodyScroll } from '@/hooks/useLockBodyScroll';
import NavAuth from './nav-auth';
import { useAuth } from '@/contexts/AuthContext';

export default function Nav() {
  const { isAdmin } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const cartTriggerRef = useRef<HTMLDivElement | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  UseLockBodyScroll(isCartOpen);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  useEffect(() => {
    if (!isCartOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(e.target as Node) &&
        cartTriggerRef.current &&
        !cartTriggerRef.current.contains(e.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

  const openCart = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isMobile) return;

    closeTimeout.current = setTimeout(() => {
      const target = e.relatedTarget;

      if (
        cartRef.current &&
        (!target ||
          !(target instanceof Node) ||
          !cartRef.current.contains(target))
      )
        setIsCartOpen(false);
    }, 100);
  };

  return (
    <nav className="grid grid-cols-3 items-center py-2 px-4 bg-apricot-100 z-50">
      <HamburgerMenu />

      <Link href="/" className="justify-self-center">
        <Image src="/logo.svg" alt="logo" priority width={100} height={70} />
      </Link>

      <div className="flex justify-end gap-4 text-base/11">
        <div
          ref={cartTriggerRef}
          className="xs:relative"
          onMouseEnter={() => !isMobile && openCart()}
          onMouseLeave={handleMouseLeave}
          onTouchStart={isMobile ? toggleCart : undefined}
          aria-haspopup="dialog"
          aria-expanded={isCartOpen}
          aria-controls="cart-popover"
        >
          <div className="cursor-pointer">Cart</div>

          {isCartOpen && (
            <div
              id="cart-popover"
              role="dialog"
              ref={cartRef}
              className="absolute left-0 xs:left-auto xs:right-0 xs:top-full xs:mt-2 z-50"
              onMouseEnter={openCart}
              onMouseLeave={closeCart}
            >
              <Cart onClose={closeCart} />
            </div>
          )}
        </div>

        <NavAuth />
        {isAdmin && <Link href="/admin">Admin</Link>}
      </div>
    </nav>
  );
}
