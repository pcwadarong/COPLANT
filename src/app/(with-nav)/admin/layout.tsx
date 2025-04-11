'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      notFound();
    }
  }, [user, loading, isAdmin]);

  if (loading || !user || !isAdmin) return null;

  return <main>{children}</main>;
}
