import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../../firebaseConfig';

export async function signUpAction(_: any, formData: FormData) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  if (!email || !password) {
    return {
      status: false,
      error: '이메일과 비밀번호를 모두 입력해야 합니다.',
    };
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { status: true, error: '' };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return { status: false, error: `Firebase 회원가입 오류: ${err.code}` };
    }
    return {
      status: false,
      error: `회원가입에 실패했습니다: ${(err as Error).message}`,
    };
  }
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

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { status: true, error: '' };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return { status: false, error: `Firebase 로그인 오류: ${err.code}` };
    }
    return {
      status: false,
      error: `로그인에 실패했습니다: ${(err as Error).message}`,
    };
  }
}

export async function signOutAction() {
  try {
    await signOut(auth);
    return { status: true, error: '' };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return { status: false, error: `Firebase 로그아웃 오류: ${err.code}` };
    }
    return {
      status: false,
      error: `로그아웃에 실패했습니다: ${(err as Error).message}`,
    };
  }
}
