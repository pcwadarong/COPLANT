'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';

import { useRouter } from 'next/navigation';

import { resetPWAction } from '@/actions/auth';
import { INITIAL_ACTION_STATE } from '@/app/constants/states';
import CustomButton from '@/components/common/button';
import { ActionState } from '@/types';

export default function FindPW() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [resetState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(resetPWAction, INITIAL_ACTION_STATE);

  useEffect(() => {
    if (!resetState) return;

    if (!resetState.status) {
      console.log(resetState.error);
      return;
    }

    if (confirm('메일이 발송되었습니다. 로그인 화면으로 돌아가시겠습니까?')) {
      router.push('/sign');
    }
    setEmail('');
  }, [resetState, router]);

  return (
    <section className="relative flex flex-col justify-center items-center gap-4 p-4 min-h-screen bg-apricot-200">
      <h1 className="text-3xl font-bold">비밀번호 재설정</h1>
      <p id="reset-password-desc" className="text-sm/6 text-center mb-6">
        COPLANT에 가입했던 이메일 주소를 입력해주세요. <br />
        작성하신 주소로 비밀번호 재설정 링크를 보내드립니다.
      </p>
      <form
        action={formAction}
        aria-describedby="reset-password-desc"
        className="flex flex-col items-center gap-3"
      >
        <label htmlFor="email" className="sr-only">
          이메일
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="aaa@a.com..."
          className="bg-apricot-300/60 rounded p-2 w-full max-w-lg tracking-wide"
        />
        <CustomButton
          isPending={isPending}
          aria-label="비밀번호 재설정 링크 메일 발송"
        >
          메일 발송하기
        </CustomButton>
      </form>
    </section>
  );
}
