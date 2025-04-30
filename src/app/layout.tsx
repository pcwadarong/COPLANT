import GoToTopButton from '@/components/common/go-to-top';
import { AuthProvider } from '@/contexts/AuthContext';

import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased font-default w-full h-screen overflow-hidden">
        <AuthProvider>{children}</AuthProvider>
        <GoToTopButton />
      </body>
    </html>
  );
}
