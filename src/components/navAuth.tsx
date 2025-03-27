'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useActionState } from 'react';
import { signOutAction } from '@/actions/auth';
import { ActionState } from '@/types';
import { useEffect } from 'react';

export default function NavAuth() {
  const { user, loading } = useAuth();
  const [authState, buttonAction, isPending] = useActionState<ActionState>(
    signOutAction,
    null,
  );

  useEffect(() => {
    if (authState?.status) {
      window.location.reload(); // 또는 router.refresh() 사용 가능
    } else if (authState && !authState.status) {
      alert(authState.error);
    }
  }, [authState]);

  if (loading) return null;

  return user ? (
    <button onClick={buttonAction} disabled={isPending}>
      {isPending ? '로그아웃 중...' : 'Logout'}
    </button>
  ) : (
    <Link href="/sign">Login</Link>
  );
}
