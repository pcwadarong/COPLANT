import "./globals.css";
import { Noto_Serif_KR, DM_Serif_Text } from "next/font/google";

const notoSerif = Noto_Serif_KR({
  preload: false,
  display: "swap",
  variable: "--font-noto-serif-kr",
  weight: ["200", "400", "500", "700", "900"],
  fallback: ["serif"],
});

const dmSerif = DM_Serif_Text({
  weight: "400", 
  display: "swap",
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
  fallback: ["serif", "Noto Serif KR"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSerif.variable} ${dmSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
