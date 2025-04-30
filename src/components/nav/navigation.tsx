'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@/contexts/AuthContext';
import { UseLockBodyScroll } from '@/hooks/useLockBodyScroll';

import Cart from './cart';
import CartMobile from './cart-mobile';
import HamburgerMenu from './hamburger';
import NavAuth from './nav-auth';

export default function Nav() {
  const { isAdmin } = useAuth();
  const [isTouchedDevice, setIsTouchedDevice] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isDesktopCartOpen, setIsDesktopCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const cartTriggerRef = useRef<HTMLDivElement | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => {
      setIsTouchedDevice(window.matchMedia('(pointer: coarse)').matches);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  UseLockBodyScroll(isMobileCartOpen);

  const openCart = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    if (isTouchedDevice) setIsMobileCartOpen(true);
    else setIsDesktopCartOpen(true);
  };

  const closeCart = () => {
    if (isTouchedDevice) setIsMobileCartOpen(false);
    else setIsDesktopCartOpen(false);
  };

  const toggleMobileCart = () => {
    if (!isTouchedDevice) return;
    setIsMobileCartOpen((prev) => !prev);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isTouchedDevice) return;

    closeTimeout.current = setTimeout(() => {
      const target = e.relatedTarget;

      if (
        cartRef.current &&
        (!target ||
          !(target instanceof Node) ||
          !cartRef.current.contains(target))
      ) {
        setIsDesktopCartOpen(false);
      }
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
          onMouseEnter={() => !isTouchedDevice && openCart()}
          onMouseLeave={handleMouseLeave}
          aria-haspopup="dialog"
          aria-expanded={isMobileCartOpen || isDesktopCartOpen}
          aria-controls="cart-popover"
        >
          <div
            className="cursor-pointer"
            onClick={isTouchedDevice ? toggleMobileCart : undefined}
          >
            Cart
          </div>

          {isMobileCartOpen && (
            <div
              className="fixed inset-0 z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeCart();
              }}
            >
              <CartMobile onClose={closeCart} />
            </div>
          )}

          {isDesktopCartOpen && (
            <div
              className="absolute hidden xs:block left-0 xs:left-auto xs:right-0 xs:top-full xs:mt-2 z-50"
              ref={cartRef}
              onMouseEnter={openCart}
              onMouseLeave={closeCart}
            >
              <Cart />
            </div>
          )}
        </div>

        <NavAuth />
        {isAdmin && <Link href="/admin">Admin</Link>}
      </div>
    </nav>
  );
}
