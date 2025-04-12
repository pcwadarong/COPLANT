import {
  handleAuth,
  signOutWithFirebase,
  resetPasswordWithFirebase,
} from '@/lib/firebase/auth';

export async function signUpAction(_: any, formData: FormData) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  if (!email || !password) {
    return {
      status: false,
      error: '이메일과 비밀번호를 모두 입력해야 합니다.',
    };
  }

  return await handleAuth('signup', email, password);
}

export async function signInAction(_: any, formData: FormData) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  if (!email || !password) {
    return {
      status: false,
      error: '이메일과 비밀번호를 모두 입력해야 합니다.',
    };
  }

  return await handleAuth('signin', email, password);
}

export async function signOutAction() {
  return await signOutWithFirebase();
}

export async function resetPWAction(_: any, formData: FormData) {
  const email = formData.get('email') as string | null;

  if (!email) {
    return {
      status: false,
      error: '이메일을 입력해주세요.',
    };
  }

  return await resetPasswordWithFirebase(email);
}
