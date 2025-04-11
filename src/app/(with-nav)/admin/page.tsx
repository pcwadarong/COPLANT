'use client';

import Link from 'next/link';

export default function AdminPage() {
  return (
    <section className="w-full h-screen p-20 flex flex-col">
      <h1 className="text-2xl font-bold my-6">관리자 페이지</h1>
      <hr className='border w-full'/>
      <ul className='space-y-3 mt-10'>
        <li>
          <Link href="/admin/product">제품 관리 페이지</Link>
        </li>
        <li>공지 쓰기</li>
        <li>문의 관리</li>
        <li>통계 보기</li>
        <li>사용자 관리</li>
      </ul>
    </section>
  );
}
