'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig'; // firebase.ts에서 export한 auth

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
};

const ADMIN_UIDS = ['admin@coplant.com'];

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        const adminCheck = ADMIN_UIDS.includes(user.uid);
        setIsAdmin(adminCheck);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe(); // 구독 해제
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
