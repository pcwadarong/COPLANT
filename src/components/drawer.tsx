'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { validateSignInput } from '@/utils/validateSignInput';

interface Props {
  isOpen: boolean;
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
      <div className='flex gap-2'>
        <input
          id="agree"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className={`
        appearance-none w-5 h-5 rounded-sm cursor-pointer
        border-2 border-gray-400  
        checked:border-black
        checked:bg-[url(/checkmark.svg)]
        checked:bg-no-repeat
        checked:bg-center
        checked:bg-[length:100%_100%]
        transition-all
    `}
        />
        <label
          htmlFor="agree"
          className={`text-sm font-medium select-none ${
            !agreed && touched ? 'text-red-600' : ''
          }`}
        >
          개인정보 수집에 동의합니다.
        </label>
      </div>

      <div className="relative w-full max-w-xs">
        <input
          type="email"
          value={email}
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

export default function Drawer({ isOpen }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-green-500 z-50 p-6"
          initial={{ clipPath: 'inset(0% 100% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 100% 100% 0%)' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 justify-between items-center text-black">
            <div className="flex-1 text-left">
              <p className="text-2xl font-bold mb-2">Contact With Us</p>
              <SubscribeEmailForm />
              <div className="mt-10 space-y-2">
                <p className="text-xl font-bold">Instagram</p>
                <p className="text-xl font-bold">CS Center</p>
              </div>
            </div>

            <div className="flex-1 text-left">
              <h2 className="text-2xl font-bold mb-4">Product</h2>
              <ul className="space-y-1 text-lg leading-relaxed">
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
