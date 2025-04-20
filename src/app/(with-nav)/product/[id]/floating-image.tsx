import Image from 'next/image';

export default function FloatingImage() {
  return (
    <>
      <Image
        src="/detail-green2.svg"
        alt="background shape left"
        width={400}
        height={200}
        className="absolute left-0 top-[700px] hidden sm:block"
      />
      <Image
        src="/detail-green3.svg"
        alt="background shape right"
        width={300}
        height={200}
        className="absolute right-0 top-[600px] hidden sm:block"
      />
      <Image
        src="/detail-leaf.svg"
        alt="leaf shape bottom"
        width={400}
        height={200}
        className="absolute bottom-0 left-0 hidden sm:block"
      />
    </>
  );
}
