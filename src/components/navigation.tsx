import Image from 'next/image';
import Link from 'next/link';
import NavAuth from './navAuth';

export default function Nav() {
  return (
    <div className="grid grid-cols-3 items-center p-4 bg-apricot-100">
      <button className="justify-self-start">
        <Image
          src="/hamburger.svg"
          alt="logo"
          priority
          width={50}
          height={70}
        />
      </button>

      <Link href="/" className="justify-self-center">
        <Image src="/logo.svg" alt="logo" priority width={120} height={70} />
      </Link>

      <div className="flex justify-end gap-4 text-base/11 px-4">
        <div>Cart</div>
        <NavAuth />
      </div>
    </div>
  );
}
