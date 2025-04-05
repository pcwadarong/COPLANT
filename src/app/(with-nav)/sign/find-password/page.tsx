'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { resetPWAction } from '@/actions/auth';
import { ActionState } from '@/types';

export default function FindPW() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [authState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(resetPWAction, null);

  useEffect(() => {
    if (authState) {
      if (!authState.status) {
        alert(authState.error);
      } else {
        if (confirm('메일이 발송되었습니다. 로그인 화면으로 돌아가시겠습니까?'))
          router.push('/sign');
        setEmail('');
      }
    }
  }, [authState, router]);

  return (
    <section className="relative flex flex-col justify-center items-center gap-4 p-4 min-h-screen bg-apricot-200">
      <h1 className="text-3xl font-bold">비밀번호 재설정</h1>
      <p className="text-sm/6 text-center mb-6">
        COPLANT에 가입했던 이메일 주소를 입력해주세요. <br /> 작성하신 주소로
        비밀번호 재설정 링크를 보내드립니다.
      </p>
      <form
        action={formAction}
        aria-describedby="reset-password-desc"
        className="space-y-3"
      >
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          autoComplete="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          placeholder="aaa@a.com..."
          className="bg-apricot-300/60 rounded p-2 w-full max-w-lg tracking-wide"
        />
        <button className="w-full rounded px-6 py-2 bg-green-400">
          {isPending ? '처리 중...' : '메일 발송하기'}
        </button>
      </form>
    </section>
  );
}
