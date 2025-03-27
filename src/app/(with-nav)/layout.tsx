import Nav from '@/components/searchBar';
import Link from 'next/link';

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-apricot-200">
      <Nav />
      {children}
      <footer className="p-10 bg-apricot-100 flex gap-14">
        <div>
          <p className="font-english mb-2">CS center</p>
          <p className="font-bold text-xl">070-xxxx-xxxx</p>
          <p className="text-sm">AM 9:30 ~ PM 5:30</p>
        </div>
        <div className="flex flex-col">
          <p className="font-english mb-2">Contact</p>
          <a
            className="text-sm"
            href="mailto:coplant@naver.com?subject=문의사항&body=안녕하세요%20문의드립니다"
          >
            coplant@naver.com
          </a>
          <a
            className="text-sm"
            href="mailto:coplant@gmail.com?subject=문의사항&body=안녕하세요%20문의드립니다"
          >
            coplant@gmail.com
          </a>
        </div>
        <div className="flex flex-col gap-2 font-english">
          <Link href="https://www.facebook.com">Facebook</Link>
          <Link href="https://instagram.com">Instagram</Link>
        </div>
      </footer>
    </div>
  );
}
