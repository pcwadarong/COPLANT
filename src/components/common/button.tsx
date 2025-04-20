'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

interface CustomButtonProps extends HTMLMotionProps<'button'> {
  isPending?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className = '',
  isPending = false,
  disabled = false,
  children,
  ...props
}) => {
  const isInactive = disabled || isPending;

  const buttonClass = clsx(
    'rounded px-4 py-2 font-semibold transition-all duration-200',
    isInactive
      ? 'bg-stone-300 cursor-not-allowed opacity-60'
      : 'bg-apricot-300 hover:bg-apricot-400 cursor-pointer',
    className,
  );

  return (
    <motion.button
      type="submit"
      disabled={isInactive}
      aria-disabled={isInactive}
      whileHover={!isInactive ? { scale: 1.02 } : undefined}
      whileTap={!isInactive ? { scale: 0.97 } : undefined}
      className={buttonClass}
      {...props}
    >
      {isPending ? '처리 중...' : children ?? '확인'}
    </motion.button>
  );
};

export default CustomButton;
