import Link from 'next/link';

import Nav from '@/components/nav/navigation';

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-apricot-200">
      <Nav />
      {children}
      <footer
        className="p-10 bg-apricot-100 flex flex-col xs:flex-row gap-4 xs:gap-14"
        aria-labelledby="footer-heading"
      >
        <p id="footer-heading" className="sr-only">
          사이트 푸터 정보
        </p>
        <div>
          <p className="font-english mb-2">CS center</p>
          <p className="font-bold text-xl" aria-label="고객센터 전화번호">
            02-xxx-xxxx
          </p>
          <p className="text-sm" aria-label="운영 시간">
            9:30 ~ 17:30
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-english mb-2">Contact</p>
          <a
            className="text-sm"
            href="mailto:coplant@naver.com?subject=문의사항&body=안녕하세요%20문의드립니다"
            aria-label="coplant 네이버 메일로 문의하기"
          >
            coplant@naver.com
          </a>
          <a
            className="text-sm"
            href="mailto:coplant@gmail.com?subject=문의사항&body=안녕하세요%20문의드립니다"
            aria-label="coplant 지메일로 문의하기"
          >
            coplant@gmail.com
          </a>
        </div>
        <ul className="flex xs:flex-col gap-2 font-english">
          <li>
            <Link
              href="https://www.facebook.com"
              aria-label="Facebook 페이지로 이동"
            >
              Facebook
            </Link>
          </li>
          <li>
            <Link
              href="https://instagram.com"
              aria-label="Instagram 페이지로 이동"
            >
              Instagram
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
