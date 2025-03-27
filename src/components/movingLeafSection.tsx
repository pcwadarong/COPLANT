'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MovingLeafSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-100px' });

  const leftLeafControls = useAnimation();
  const rightLeafControls = useAnimation();

  useEffect(() => {
    if (inView) {
      leftLeafControls.start({
        x: '-50%',
        opacity: 0,
        transition: { duration: 1.5, ease: 'easeInOut' },
      });
      rightLeafControls.start({
        x: '50%',
        opacity: 0,
        transition: { duration: 1.5, ease: 'easeInOut' },
      });
    } else {
      leftLeafControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1, ease: 'easeInOut' },
      });
      rightLeafControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1, ease: 'easeInOut' },
      });
    }
  }, [inView, leftLeafControls, rightLeafControls]);

  return (
    <section ref={ref} className="relative pb-30 pt-20">
      <motion.div
        className="absolute left-0 bottom-0 z-20"
        animate={leftLeafControls}
        initial={{ x: 0, opacity: 1 }}
      >
        <Image src="/main-leaf1.svg" alt="leaf" width={640} height={900} />
      </motion.div>

      <div className="relative pl-12">
        <Image
          src="/main-green2.svg"
          alt="circle bg"
          width={900}
          height={900}
          className="m-auto"
        />

        <div className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
          <p className="font-semibold mb-10 sm:mb-16 text-3xl/12 sm:text-5xl/16">
            나에게 맞는 <br /> 반려식물 <br /> 찾아보기
          </p>
          <div className="flex justify-center gap-4">
            <Link
              className="px-4 py-2 rounded-md shadow bg-apricot-200"
              href="/test"
            >
              테스트하기
            </Link>
            <Link
              className="px-4 py-2 rounded-md shadow bg-apricot-200"
              href="/product-list"
            >
              제품 보기
            </Link>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute top-0 right-0 z-20"
        animate={rightLeafControls}
        initial={{ x: 0, opacity: 1 }}
      >
        <Image
          src="/main-leaf2.svg"
          alt="leaf right"
          width={640}
          height={900}
        />
      </motion.div>
    </section>
  );
}
