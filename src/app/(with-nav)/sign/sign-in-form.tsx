'use client';

import { useState } from 'react';
import {
  handleAuth,
} from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { validateSignInput } from '@/lib/utils/validateSignInput';

export function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = validateSignInput('email', email);
  const isPasswordValid = validateSignInput('password', password);
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      await handleAuth('signin', email, password);
      router.refresh();
    } catch (err) {
      alert('로그인 실패: ' + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="signin-form-desc">
      <div id="signin-form-desc" className="sr-only">
        로그인 폼입니다. 이메일과 비밀번호를 입력하세요.
      </div>

      <label htmlFor="email">이메일 주소</label>
      {!isEmailValid && touched.email && (
        <span id="email-error" className="ml-4 text-sm text-red-600">
          유효한 이메일 주소를 입력하세요.
        </span>
      )}
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur('email')}
        autoComplete="email"
        required
        aria-invalid={!isEmailValid}
        aria-describedby={
          !isEmailValid && touched.email ? 'email-error' : undefined
        }
        className="mt-2 mb-4 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />

      <label htmlFor="password">비밀번호</label>
      {!isPasswordValid && touched.password && (
        <span id="password-error" className="ml-4 text-sm text-red-600">
          비밀번호 형식을 확인해주세요.
        </span>
      )}
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur('password')}
        autoComplete="current-password"
        required
        aria-invalid={!isPasswordValid}
        aria-describedby={
          !isPasswordValid && touched.password
            ? 'password-error'
            : 'signin-form-desc'
        }
        className="mt-2 mb-6 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />

      <div className="flex justify-between">
        <Link
          href="sign/find-password"
          className="underline underline-offset-6"
        >
          Forgot Password?
        </Link>
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`rounded-xl px-6 py-1.5 text-white bg-apricot-600 ${
            isFormValid
              ? 'cursor-pointer hover:shadow'
              : 'cursor-not-allowed opacity-60'
          }`}
        >
          {isSubmitting ? '처리 중...' : '로그인'}
        </button>
      </div>
    </form>
  );
}