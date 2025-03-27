import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className="w-full flex justify-between p-4 bg-apricot-100">
      <button><Image src="/hamburger.svg" alt="logo" width={50} height={70} /></button>
      <Link href="/" className='pt-[2px]'><Image src="/logo.svg" alt="logo" width={120} height={70} /></Link>
      <div className='flex gap-4 text-base/11 px-4'>
        <div>Cart</div>
        <Link href="/sign">Sign in</Link>
      </div>
    </div>
  );
}
