'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

import { signUpAction } from '@/actions/auth';
import { validateSignInput } from '@/lib/utils/signSchema';

export function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const [result, formAction, isPending] = useActionState(signUpAction, null);

  const isEmailValid = validateSignInput('email', email);
  const isPasswordValid = validateSignInput('password', password);
  const doPasswordsMatch = password === passwordConfirm;
  const isFormValid = isEmailValid && isPasswordValid && doPasswordsMatch;

  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (result) {
        if (!result.status) {
          alert(result.error);
        } else {
          await router.push('/');
          setEmail('');
          setPassword('');
          setPasswordConfirm('');
        }
      }
    };

    handleAuthRedirect();
  }, [result, router]);

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <form action={formAction} noValidate aria-describedby="signup-form-desc">
      <div id="signup-form-desc" className="sr-only">
        회원가입 폼입니다. 이메일, 비밀번호, 비밀번호 확인을 입력하세요.
      </div>

      <label htmlFor="newEmail">이메일 주소</label>
      {!isEmailValid && touched.email && (
        <span id="email-error" className="ml-4 text-sm text-red-600">
          유효한 이메일 주소를 입력하세요.
        </span>
      )}
      <input
        id="newEmail"
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

      <label htmlFor="newPW">비밀번호</label>
      {!isPasswordValid && touched.password && (
        <span id="password-error" className="ml-4 text-sm text-red-600">
          비밀번호 형식을 확인해주세요.
        </span>
      )}
      <input
        id="newPW"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="영문, 숫자, 특수문자 포함 8~20자"
        onBlur={() => handleBlur('password')}
        autoComplete="new-password"
        required
        aria-invalid={!isPasswordValid}
        aria-describedby={
          !isPasswordValid && touched.password
            ? 'password-error'
            : 'signup-form-desc'
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
        id="confirmPW"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        autoComplete="new-password"
        required
        aria-invalid={!doPasswordsMatch}
        aria-describedby={
          !doPasswordsMatch ? 'confirm-error' : 'signup-form-desc'
        }
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
