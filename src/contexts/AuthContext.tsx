'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, getIdTokenResult } from 'firebase/auth';
import { auth } from '../lib/firebase/firebaseConfig';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
};

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
  
      if (user) {
        try {
          await user.getIdToken(true); 
          const token = await getIdTokenResult(user);
          const isAdminClaim = token.claims.admin === true;
          setIsAdmin(isAdminClaim);
        } catch (err) {
          console.error('Failed to fetch token claims:', err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
  
      setLoading(false);
    });
  
    return () => unsubscribe();
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
