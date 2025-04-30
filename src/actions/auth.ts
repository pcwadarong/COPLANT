'use server';

import { handleAuth, resetPasswordWithFirebase } from '@/lib/firebase/auth';
import { signUpSchema } from '@/lib/validation/sign-schema';

export async function signUpAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  const confirmPassword = formData.get('confirmPassword') as string | null;

  const validation = signUpSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!validation.success) {
    const error = validation.error.flatten().fieldErrors;
    return {
      status: false,
      error:
        error.email?.[0] ||
        error.password?.[0] ||
        error.confirmPassword?.[0] ||
        '입력값을 다시 확인해주세요.',
    };
  }

  return await handleAuth('signup', email!, password!);
}

export async function resetPWAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }> {
  const email = formData.get('email') as string | null;

  if (!email) {
    return {
      status: false,
      error: '이메일을 입력해주세요.',
    };
  }

  return await resetPasswordWithFirebase(email);
}
