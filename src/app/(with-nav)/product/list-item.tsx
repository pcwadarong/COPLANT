'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProductPreview } from '@/types';

export const ListItem = (item: ProductPreview) => (
  <li key={item.id}>
    <Link
      href={`product/${item.id}`}
      className="flex flex-col items-center gap-4 font-bold"
    >
      <Image
        src={item.imageUrls.list}
        alt={item.name}
        width={200}
        height={200}
      />
      <p>{item.name}</p>
    </Link>
  </li>
);
