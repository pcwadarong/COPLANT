'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import CustomCheckbox from '../common/customCheckbox';

import { ProductName } from '@/types';
import { fetchProductNamesOnServer } from '@/actions/get-product';
import { validateSignInput } from '@/lib/utils/signSchema';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribeEmailForm = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState(false);

  const isEmailValid = validateSignInput('email', email);
  const isFormValid = isEmailValid && agreed;

  const onSubmitButton = () => {
    alert(`${email}로 구독 신청 되셨습니다.`);
    setEmail('');
    setAgreed(false);
    setTouched(false);
  };

  return (
    <>
      <CustomCheckbox
        id="agree"
        label="개인정보 수집에 동의합니다."
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        borderCheckedColor={'green'}
        className={`${!agreed && touched ? 'text-red-600' : ''}`}
      />

      <div className="relative w-full md:w-sm">
        <input
          type="email"
          id="subscribe-email"
          name="email"
          placeholder="이메일 입력"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`border-b-2 w-full py-2 focus:outline-none bg-transparent transition-colors
          ${!isEmailValid && touched ? 'border-red-600' : 'border-black'}
        `}
        />
        <button
          disabled={!isFormValid}
          onClick={onSubmitButton}
          className={`absolute right-0 bottom-2 text-xl transition-opacity ${
            isFormValid ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          →
        </button>
      </div>
    </>
  );
};

export default function Drawer({ isOpen, onClose }: Props) {
  const [products, setProducts] = useState<ProductName[]>([]);

  useEffect(() => {
    fetchProductNamesOnServer().then(setProducts);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-green-500 z-50 p-6 flex justify-center items-center"
          initial={{ clipPath: 'inset(0% 100% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 100% 100% 0%)' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="size-fit flex flex-col-reverse md:flex-row gap-20">
            <section className="flex flex-col gap-10 justify-between">
              <div>
                <h2 id="subscribe-form" className="text-2xl font-bold mb-4">
                  Contact With Us
                </h2>
                <SubscribeEmailForm />
              </div>

              <ul className="space-y-8 font-english text-2xl font-bold">
                <li>
                  <Link
                    href="https://www.facebook.com"
                    aria-label="Facebook 페이지로 이동"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://instagram.com"
                    aria-label="Instagram 페이지로 이동"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Product</h2>
              <ul className="space-y-1 text-lg leading-relaxed">
                <Link href="/product" onClick={onClose}>
                  전체 보기
                </Link>
                {products.map((item) => (
                  <li key={item.id}>
                    <Link href={`/product/${item.id}`}></Link>
                    {item.name}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
