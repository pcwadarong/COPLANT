import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased font-default">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
