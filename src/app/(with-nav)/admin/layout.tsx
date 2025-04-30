'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace('/404');
    }
  }, [user, loading, isAdmin, router]);

  if (loading || !user || !isAdmin) return null;

  return <main>{children}</main>;
}
