import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export async function signUpAction(_: any, formData: FormData) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  const auth = getAuth();

  if (!email || !password) {
    return {
      status: false,
      error: '이메일과 비밀번호를 모두 입력해야 합니다.',
    };
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return {
      status: true,
      error: '',
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      error: `회원가입에 실패했습니다: ${(err as Error).message}`,
    };
  }
}

export async function signInAction(_: any, formData: FormData) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  const auth = getAuth();

  if (!email || !password) {
    return {
      status: false,
      error: '이메일과 비밀번호를 모두 입력해야 합니다.',
    };
  }

  try {
    signInWithEmailAndPassword(auth, email, password);
    return {
      status: true,
      error: '',
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      error: `로그인에 실패했습니다: ${(err as Error).message}`,
    };
  }
}
