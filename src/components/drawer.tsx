'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import CustomCheckbox from './customCheckbox';
import { validateSignInput } from '@/utils/validateSignInput';

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
        width={20}
        height={20}
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

export default function Drawer(isOpen: boolean) {
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
            <div className="flex flex-col gap-10 justify-between">
              <div>
                <h2 id="subscribe-form" className="text-2xl font-bold mb-4">Contact With Us</h2>
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
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Product</h2>
              <ul className="space-y-1 text-lg leading-relaxed">
                {/* 여기 판매상품 목록 가져와서 정렬할 필요 있음. 대신 한 ul에 최대 10개까지*/}
                <li>여인초</li>
                <li>아레카야자</li>
                <li>스투키</li>
                <li>몬스테라</li>
                <li>호프셀렘</li>
                <li>백갈고무나무</li>
                <li>스파티필름</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
