'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useActionState } from 'react';
import { signOutAction } from '@/actions/auth';
import { ActionState } from '@/types';
import { useEffect } from 'react';

export default function NavAuth() {
  const { user, loading } = useAuth();
  const [authState, buttonAction] = useActionState<ActionState>(
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

  return (
    <div className="w-[80px] text-end">
      {loading ? (
        'Loading'
      ) : user ? (
        <button onClick={buttonAction}>Logout</button>
      ) : (
        <Link href="/sign">Login</Link>
      )}
    </div>
  );
}
