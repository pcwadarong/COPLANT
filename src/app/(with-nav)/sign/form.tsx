'use client';

import { signUpAction, signInAction } from '@/actions/auth';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { validateSignInput } from '@/utils/validateSignInput';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

type ActionState = {
  status: boolean;
  error?: string;
};

export function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    signInAction,
    null,
  );

  const emailValid = validateSignInput('email', email);
  const passwordValid = validateSignInput('password', password);
  const canSubmit = emailValid && passwordValid;

  useEffect(() => {
    if (state) {
      if (!state.status) {
        alert(state.error);
      } else {
        setEmail('');
        setPassword('');
        router.push('/');
      }
    }
  }, [state, router]);

  return (
    <form action={formAction} noValidate>
      <label htmlFor="email">이메일 주소</label>
      {!emailValid && touched.email && (
        <span className="ml-4 text-sm text-red-600">유효한 이메일 주소를 입력하세요.</span>
      )}
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        autoComplete="email"
        className="mt-2 mb-4 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />

      <label htmlFor="password">비밀번호</label>
      {!passwordValid && touched.password && (
        <span className="ml-4 text-sm text-red-600">비밀번호 형식을 확인해주세요.</span>
      )}
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
        autoComplete="current-password"
        className="mt-2 mb-6 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />

      <div className="flex justify-between">
        <Link href="/find-password" className="underline underline-offset-6">
          Forgot Password?
        </Link>
        <button
          type="submit"
          disabled={!canSubmit}
          className={`rounded-xl px-6 py-1.5 text-white bg-apricot-600 ${
            canSubmit
              ? 'cursor-pointer hover:shadow'
              : 'cursor-not-allowed opacity-60'
          }`}
        >
          {isPending ? '처리 중...' : '로그인'}
        </button>
      </div>
    </form>
  );
}

export function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    signUpAction,
    null,
  );

  const emailValid = validateSignInput('email', email);
  const passwordValid = validateSignInput('password', password);
  const passwordsMatch = password === passwordConfirm;
  const canSubmit = emailValid && passwordValid && passwordsMatch;

  useEffect(() => {
    if (state) {
      if (!state.status) {
        alert(state.error);
      } else if (state.status === true) {
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        router.push('/');
      }
    }
  }, [state, router]);

  return (
    <form action={formAction} noValidate>
      <label htmlFor="newEmail">이메일 주소</label>
      {!emailValid && touched.email && (
        <span className="ml-4 text-sm text-red-600">유효한 이메일 주소를 입력하세요.</span>
      )}
      <input
        required
        id="newEmail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        autoComplete="email"
        className="mt-2 mb-4 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />
      <label htmlFor="newPW">비밀번호</label>
      {!passwordValid && touched.password && (
        <span className="ml-4 text-sm text-red-600">비밀번호 형식을 확인해주세요.</span>
      )}
      <input
        required
        id="newPW"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="영문, 숫자, 특수문자 포함 8~20자"
        onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
        autoComplete="new-password"
        className="mt-2 mb-4 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />
      <label htmlFor="confirmPW">비밀번호 확인</label>
      {!passwordsMatch && passwordConfirm.length > 0 && (
        <span className="ml-4 text-sm text-red-600">비밀번호가 일치하지 않습니다.</span>
      )}
      <input
        required
        id="confirmPW"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        autoComplete="new-password"
        className="mt-2 mb-6 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!canSubmit}
          className={`rounded-xl px-6 py-1.5 text-white bg-apricot-600 ${
            canSubmit
              ? 'cursor-pointer hover:shadow'
              : 'cursor-not-allowed opacity-60'
          }`}
        >
          {isPending ? '처리 중...' : '회원가입'}
        </button>
      </div>
    </form>
  );
}
