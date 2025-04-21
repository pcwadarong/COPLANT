'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProductPreview } from '@/types';

export const ListItem = (item: ProductPreview) => (
  <motion.li
    key={item.id}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <Link
      href={`product/${item.id}`}
      className="flex flex-col items-center gap-4 p-4 font-bold"
    >
      <motion.div layoutId={`image-${item.id}`}>
        <Image
          src={item.imageUrls.list}
          alt={item.name}
          width={200}
          height={200}
        />
      </motion.div>
      <motion.p layoutId={`name-${item.id}`} whileHover={{ color: '#9bb067' }}>
        {item.name}
      </motion.p>
    </Link>
  </motion.li>
);
