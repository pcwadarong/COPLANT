'use client';

import { useActionState } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUpAction, signInAction } from '@/actions/auth';
import { validateSignInput } from '@/utils/validateSignInput';
import { ActionState } from '@/types';

export function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });
  const [authState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(signInAction, null);

  const isEmailValid = validateSignInput('email', email);
  const isPasswordValid = validateSignInput('password', password);
  const isFormValid = isEmailValid && isPasswordValid;

  useEffect(() => {
    if (authState) {
      if (!authState.status) {
        alert(authState.error);
      } else {
        setEmail('');
        setPassword('');
        router.push('/');
      }
    }
  }, [authState, router]);

  return (
    <form action={formAction} noValidate aria-describedby="signin-form-desc">
      <div id="signin-form-desc" className="sr-only">
        로그인 폼입니다. 이메일과 비밀번호를 입력하세요.
      </div>

      <label htmlFor="email">이메일 주소</label>
      {!isEmailValid && touchedFields.email && (
        <span className="ml-4 text-sm text-red-600">
          유효한 이메일 주소를 입력하세요.
        </span>
      )}
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouchedFields((prev) => ({ ...prev, email: true }))}
        autoComplete="email"
        required
        aria-invalid={!isEmailValid}
        aria-describedby={
          !isEmailValid && touchedFields.email ? 'email-error' : undefined
        }
        className="mt-2 mb-4 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />

      <label htmlFor="password">비밀번호</label>
      {!isPasswordValid && touchedFields.password && (
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
        onBlur={() => setTouchedFields((prev) => ({ ...prev, password: true }))}
        autoComplete="current-password"
        required
        aria-invalid={!isPasswordValid}
        aria-describedby={
          !isPasswordValid && touchedFields.password
            ? 'password-error'
            : undefined
        }
        className="mt-2 mb-6 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />

      <div className="flex justify-between">
        <Link href="sign/find-password" className="underline underline-offset-6">
          Forgot Password?
        </Link>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`rounded-xl px-6 py-1.5 text-white bg-apricot-600 ${
            isFormValid
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });
  const [authState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(signUpAction, null);

  const isEmailValid = validateSignInput('email', email);
  const isPasswordValid = validateSignInput('password', password);
  const doPasswordsMatch = password === passwordConfirm;
  const isFormValid = isEmailValid && isPasswordValid && doPasswordsMatch;

  useEffect(() => {
    if (authState) {
      if (!authState.status) {
        alert(authState.error);
      } else {
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        router.push('/');
      }
    }
  }, [authState, router]);

  return (
    <form action={formAction} noValidate aria-describedby="signup-form-desc">
      <div id="signup-form-desc" className="sr-only">
        회원가입 폼입니다. 이메일, 비밀번호, 비밀번호 확인을 입력하세요.
      </div>

      <label htmlFor="newEmail">이메일 주소</label>
      {!isEmailValid && touchedFields.email && (
        <span className="ml-4 text-sm text-red-600">
          유효한 이메일 주소를 입력하세요.
        </span>
      )}
      <input
        required
        id="newEmail"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouchedFields((prev) => ({ ...prev, email: true }))}
        autoComplete="email"
        aria-invalid={!isEmailValid}
        aria-describedby={
          !isEmailValid && touchedFields.email ? 'email-error' : undefined
        }
        className="mt-2 mb-4 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />

      <label htmlFor="newPW">비밀번호</label>
      {!isPasswordValid && touchedFields.password && (
        <span id="password-error" className="ml-4 text-sm text-red-600">
          비밀번호 형식을 확인해주세요.
        </span>
      )}
      <input
        required
        id="newPW"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="영문, 숫자, 특수문자 포함 8~20자"
        onBlur={() => setTouchedFields((prev) => ({ ...prev, password: true }))}
        autoComplete="new-password"
        aria-invalid={!isPasswordValid}
        aria-describedby={
          !isPasswordValid && touchedFields.password
            ? 'password-error'
            : undefined
        }
        className="mt-2 mb-4 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />

      <label htmlFor="confirmPW">비밀번호 확인</label>
      {!doPasswordsMatch && passwordConfirm.length > 0 && (
        <span id="confirm-error" className="ml-4 text-sm text-red-600">
          비밀번호가 일치하지 않습니다.
        </span>
      )}
      <input
        required
        id="confirmPW"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        autoComplete="new-password"
        aria-invalid={!doPasswordsMatch}
        aria-describedby={!doPasswordsMatch ? 'confirm-error' : undefined}
        className="mt-2 mb-6 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`rounded-xl px-6 py-1.5 text-white bg-apricot-600 ${
            isFormValid
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
