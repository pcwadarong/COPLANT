import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from './firebaseConfig';

export async function handleAuth(
  type: 'signup' | 'signin',
  email: string,
  password: string,
) {
  try {
    if (type === 'signup') {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  } catch (err) {
    const authType = type === 'signup' ? '회원가입' : '로그인';
    if (err instanceof FirebaseError) {
      return { status: false, error: `Firebase ${authType} 오류: ${err.code}` };
    }
    return {
      status: false,
      error: `${authType} 실패: ${(err as Error).message}`,
    };
  }
}

export async function signOutWithFirebase() {
  try {
    await signOut(auth);
    return { status: true, error: '' };
  } catch (err) {
    return { status: false, error: `로그아웃 실패: ${(err as Error).message}` };
  }
}

export async function resetPasswordWithFirebase(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { status: true, error: '' };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return {
        status: false,
        error: `비밀번호 재설정 오류: ${err.code}`,
      };
    }
    return {
      status: false,
      error: `비밀번호 재설정 실패: ${(err as Error).message}`,
    };
  }
}
