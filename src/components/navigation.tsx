import Image from 'next/image';
import Link from 'next/link';
import NavAuth from './navAuth';
import HamburgerMenu from './hamburger';

export default function Nav() {
  return (
    <nav className="grid grid-cols-3 items-center py-2 px-4 bg-apricot-100">
      <HamburgerMenu />

      <Link href="/" className="justify-self-center">
        <Image src="/logo.svg" alt="logo" priority width={100} height={70} />
      </Link>

      <div className="flex justify-end gap-4 text-base/11">
        <div>Cart</div>
        <NavAuth />
      </div>
    </nav>
  );
}
