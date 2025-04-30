'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import CustomButton from '@/components/common/button';
import { handleAuth } from '@/lib/firebase/auth';
import { signInSchema } from '@/lib/validation/sign-schema';

const fields = ['email', 'password'] as const;
type Field = (typeof fields)[number];

export function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<Field, string>>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<Field, string>>({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    email: false,
    password: false,
  });
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleBlur = (field: Field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const result = signInSchema.safeParse(formData);
    if (!result.success) {
      const issue = result.error.issues.find((e) => e.path[0] === field);
      if (issue) setErrors((prev) => ({ ...prev, [field]: issue.message }));
    } else setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signInSchema.parse(formData);
      setErrors({ email: '', password: '' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0] || '',
          password: fieldErrors.password?.[0] || '',
        });
        return;
      }
    }

    setIsPending(true);
    try {
      await handleAuth('signin', formData.email, formData.password);
      router.refresh();
    } catch (err) {
      alert('로그인 실패: ' + (err as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  const isFormValid =
    !errors.email && !errors.password && formData.email && formData.password;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="signin-form-desc"
    >
      <div id="signin-form-desc" className="sr-only">
        로그인 폼입니다. 이메일과 비밀번호란을 입력해주세요.
      </div>

      {fields.map((field) => (
        <div key={field} className="relative">
          <label htmlFor={field}>
            {field === 'email' ? '이메일 주소' : '비밀번호'}
          </label>
          {errors[field] && touched[field] && (
            <span id={`${field}-error`} className="ml-4 text-sm text-red-600">
              {errors[field]}
            </span>
          )}
          <input
            id={field}
            name={field}
            type={
              field === 'password'
                ? showPassword
                  ? 'text'
                  : 'password'
                : 'email'
            }
            value={formData[field]}
            onChange={handleChange(field)}
            onBlur={() => handleBlur(field)}
            autoComplete={field === 'email' ? 'email' : 'current-password'}
            required
            aria-invalid={!!errors[field]}
            aria-describedby={
              errors[field] && touched[field]
                ? `${field}-error`
                : 'signin-form-desc'
            }
            className={`mt-2 mb-4 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide ${
              field === 'password' ? 'pr-15' : ''
            }`}
          />
          {field === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-sm absolute right-3 bottom-6.5"
            >
              {showPassword ? '숨기기' : '보기'}
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between">
        <Link
          href="sign/find-password"
          className="underline underline-offset-6"
        >
          Forgot Password?
        </Link>
        <CustomButton
          isPending={isPending}
          disabled={!isFormValid}
          className={isFormValid ? 'bg-apricot-600 text-white' : ''}
        >
          로그인
        </CustomButton>
      </div>
    </form>
  );
}
