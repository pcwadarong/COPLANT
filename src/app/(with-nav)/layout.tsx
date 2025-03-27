import Nav from '@/components/searchBar';

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Nav />
      {children}
      <footer className='p-15 bg-apricot-100 flex gap-14'>
        <div>
          <p className='font-english'>CS center</p>
          <p className='font-bold text-2xl'>070-xxxx-xxxx</p>
          <p className='text-sm'>AM 9:30 ~ PM 5:30</p>
        </div>
        <div>
          <p className='font-english'>Contact</p>
          <p className='text-sm'>coplant@xxxxx.com</p>
          <p className='text-sm'>coplant@xxxxx.com</p>
        </div>
        <div>
          <p className='font-english'>Facebook</p>
          <p className='font-english'>Instagram</p>
        </div>
      </footer>
    </div>
  );
}
