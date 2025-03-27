'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function MovingLeafSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });

  const leftLeafControls = useAnimation();
  const rightLeafControls = useAnimation();

  useEffect(() => {
    const animateLeaves = (x: string, opacity: number, duration = 1.5) => ({
      x,
      opacity,
      transition: { duration, ease: 'easeInOut' },
    });

    if (isInView) {
      leftLeafControls.start(animateLeaves('-50%', 0));
      rightLeafControls.start(animateLeaves('50%', 0));
    } else {
      leftLeafControls.start(animateLeaves('0%', 1, 1));
      rightLeafControls.start(animateLeaves('0%', 1, 1));
    }
  }, [isInView, leftLeafControls, rightLeafControls]);

  return (
    <section
      ref={ref}
      className="relative pb-30 pt-20"
      aria-labelledby="leaf-section-heading"
    >
      <h2 id="leaf-section-heading" className="sr-only">
        반려식물 테스트 및 제품 보기
      </h2>

      <motion.div
        className="absolute left-0 bottom-0 z-20"
        animate={leftLeafControls}
        initial={{ x: 0, opacity: 1 }}
        aria-hidden="true"
      >
        <Image src="/main-leaf1.svg" alt="leaf" width={640} height={900} />
      </motion.div>

      <div className="relative pl-12">
        <Image
          src="/main-green2.svg"
          alt="circle bg"
          aria-hidden="true"
          width={900}
          height={900}
          className="m-auto"
        />

        <div
          className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center"
          aria-describedby="leaf-section-desc"
        >
          <p
            id="leaf-section-desc"
            className="font-semibold mb-10 sm:mb-16 text-3xl/12 sm:text-5xl/16"
          >
            나에게 맞는 <br /> 반려식물 <br /> 찾아보기
          </p>
          <div className="flex justify-center gap-4">
            <Link
              className="px-4 py-2 rounded-md shadow bg-apricot-200"
              href="/test"
              aria-label="반려식물 테스트하러 가기"
            >
              테스트하기
            </Link>
            <Link
              className="px-4 py-2 rounded-md shadow bg-apricot-200"
              href="/product-list"
              aria-label="반려식물 제품 보러 가기"
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
        aria-hidden="true"
      >
        <Image src="/main-leaf2.svg" alt="" width={640} height={900} />
      </motion.div>
    </section>
  );
}
