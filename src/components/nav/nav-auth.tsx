'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { signOutWithFirebase } from '@/lib/firebase/auth';

export default function NavAuth() {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    const result = await signOutWithFirebase();
    if (result.status) {
      window.location.reload();
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="w-[80px] text-end">
      {loading ? (
        'Loading'
      ) : user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link href="/sign">Login</Link>
      )}
    </div>
  );
}
