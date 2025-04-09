'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import { SignIn, SignUp } from './form';

export default function SignPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      notFound();
    }
  }, [user, loading]);

  if (loading || !user) return <div>로딩중입니다...</div>;

  return (
    <main
      className="relative flex flex-col md:flex-row md:justify-center gap-10 lg:gap-30 p-10 md:py-40 min-h-screen bg-apricot-400"
      aria-labelledby="sign-page-heading"
    >
      <section
        className="max-w-xl md:w-xl z-10"
        aria-labelledby="login-heading"
      >
        <h1 id="login-heading" className="font-english text-4xl font-bold mb-6">
          Login
        </h1>
        <SignIn />
      </section>
      <section
        className="max-w-xl md:w-xl z-10"
        aria-labelledby="signup-heading"
      >
        <h2
          id="signup-heading"
          className="font-english text-4xl font-bold mb-6"
        >
          Create Account
        </h2>
        <SignUp />
      </section>
      <Image
        src="/login.png"
        aria-hidden="true"
        alt=""
        width={600}
        height={160}
        priority
        className="absolute bottom-0 left-0 min-w-[600px] z-0 pointer-events-none"
      />
    </main>
  );
}
