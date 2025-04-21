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

  return loading ? (
    <p>Loading</p>
  ) : user ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <Link href="/sign">Login</Link>
  );
}
