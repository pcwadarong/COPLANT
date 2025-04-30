'use client';

import { useActionState, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { signUpAction } from '@/actions/auth';
import { INITIAL_ACTION_STATE } from '@/app/constants/states';
import CustomButton from '@/components/common/button';
import { signUpSchema } from '@/lib/validation/sign-schema';
import { ActionState } from '@/types';

export function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [result, formAction, isPending] = useActionState<ActionState, FormData>(
    signUpAction,
    INITIAL_ACTION_STATE,
  );

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const issue = result.error.issues.find((e) => e.path[0] === field);
      if (issue) setErrors((prev) => ({ ...prev, [field]: issue.message }));
    } else setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const isFormValid =
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    formData.email &&
    formData.password &&
    formData.confirmPassword;

  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (result) {
        if (!result.status) {
          console.log(result.error);
        } else {
          await router.push('/');
          setFormData({ email: '', password: '', confirmPassword: '' });
        }
      }
    };

    handleAuthRedirect();
  }, [result, router]);

  return (
    <form action={formAction} noValidate aria-describedby="signup-form-desc">
      <div id="signup-form-desc" className="sr-only">
        회원가입 폼입니다. 이메일, 비밀번호, 비밀번호 확인란을 입력해주세요.
      </div>

      {(['email', 'password', 'confirmPassword'] as const).map((field) => (
        <div key={field} className="relative">
          <label htmlFor={field}>
            {field === 'email'
              ? '이메일 주소'
              : field === 'password'
              ? '비밀번호'
              : '비밀번호 확인'}
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
              field === 'email'
                ? 'email'
                : showPassword[field]
                ? 'text'
                : 'password'
            }
            value={formData[field]}
            onChange={handleChange(field)}
            onBlur={() => handleBlur(field)}
            autoComplete={field === 'email' ? 'email' : 'new-password'}
            required
            aria-invalid={!!errors[field]}
            aria-describedby={
              errors[field] && touched[field]
                ? `${field}-error`
                : 'signup-form-desc'
            }
            placeholder={
              field === 'password'
                ? '영문, 숫자, 특수문자 포함 8~20자'
                : undefined
            }
            className={`mt-2 mb-4 bg-apricot-500 rounded p-2 w-full max-w-xl text-base tracking-wide ${
              field !== 'email' ? 'pr-15' : ''
            }`}
          />
          {field !== 'email' && (
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  [field]: !prev[field],
                }))
              }
              className="text-sm absolute right-3 bottom-6.5"
            >
              {showPassword[field] ? '숨기기' : '보기'}
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-end">
        <CustomButton
          isPending={isPending}
          disabled={!isFormValid}
          className={isFormValid ? 'bg-apricot-600 text-white' : ''}
        >
          회원가입
        </CustomButton>
      </div>
    </form>
  );
}
