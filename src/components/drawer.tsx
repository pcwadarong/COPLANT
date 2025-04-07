'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { validateSignInput } from '@/utils/validateSignInput';

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
    <div>
      <input
        className="mb-4 mr-2"
        type="checkbox"
        id="agree"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      />
      <label
        htmlFor="agree"
        className={`font-medium ${!agreed && touched ? 'text-red-600' : ''}`}
      >
        개인정보 수집에 동의합니다.
      </label>

      <div className="relative w-full max-w-xs">
        <input
          type="email"
          value={email}
          placeholder="이메일 입력"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`border-b-2 w-full py-2 focus:outline-none bg-transparent transition-colors
          ${!isEmailValid && touched ? 'border-red-500' : 'border-black'}
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
    </div>
  );
};

export default function Drawer({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-green-500 z-40 p-6"
          initial={{ clipPath: 'inset(0% 100% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 100% 100% 0%)' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 justify-between items-center text-black">
            <div className="flex-1">
              <p className="text-2xl font-bold mb-2">Contact With Us</p>
              <SubscribeEmailForm />
              <div className="mt-10 space-y-2 text-xl font-bold">
                <p>Instagram</p>
                <p>CS Center</p>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">
                <Link href="/product-list" onClick={onClose}>
                  Product
                </Link>
              </h2>
              <ul className="space-y-1 text-lg leading-relaxed">
                {/* map으로 수정 예정 */}
                {/* <li><Link href={`/product/${id}`}></Link>{title}</li> */}
                <li>
                  <Link href={`/product/arencia`} onClick={onClose}>
                    아렌시아
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
