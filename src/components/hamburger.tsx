'use client';

import { motion, Transition, SVGMotionProps } from 'framer-motion';
import { useState } from 'react';
import Drawer from './drawer';
import { UseLockBodyScroll } from '@/hooks/useLockBodyScroll';

interface Props {
  isOpen?: boolean;
  color?: string;
  strokeWidth?: number;
  transition?: Transition;
  width?: number;
  height?: number;
}

const MenuButton = ({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 2,
  color = '#000',
  transition = {
    duration: 0.4,
    ease: 'easeInOut',
  },
}: Props) => {
  const variants = {
    top: {
      closed: { rotate: 0, y: 0 },
      opened: { rotate: 45, y: 6 },
    },
    center: {
      closed: { opacity: 1 },
      opened: { opacity: 0 },
    },
    bottom: {
      closed: { rotate: 0, y: 0 },
      opened: { rotate: -45, y: -6 },
    },
  };

  const commonProps: SVGMotionProps<SVGLineElement> = {
    stroke: color,
    strokeWidth,
    vectorEffect: 'non-scaling-stroke',
    transition,
  };

  const currentVariant = isOpen ? 'opened' : 'closed';

  return (
    <motion.svg viewBox="0 0 24 24" width={width} height={height}>
      <motion.line
        x1="3"
        x2="21"
        y1="6"
        y2="6"
        initial="closed"
        animate={currentVariant}
        variants={variants.top}
        {...commonProps}
      />
      <motion.line
        x1="3"
        x2="21"
        y1="12"
        y2="12"
        initial="closed"
        animate={currentVariant}
        variants={variants.center}
        {...commonProps}
      />
      <motion.line
        x1="3"
        x2="21"
        y1="18"
        y2="18"
        initial="closed"
        animate={currentVariant}
        variants={variants.bottom}
        {...commonProps}
      />
    </motion.svg>
  );
};

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  UseLockBodyScroll(isOpen);

  return (
    <>
      <button
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        onClick={() => setIsOpen(!isOpen)}
        className="justify-self-start z-50"
      >
        <MenuButton isOpen={isOpen} />
      </button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </>
  );
}
