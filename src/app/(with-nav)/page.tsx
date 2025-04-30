import type { Metadata } from 'next';
import Image from 'next/image';

import MovingLeafSection from './moving-leaf';

export const metadata: Metadata = {
  title: 'CoPlant',
  description: '반려식물 큐레이팅 & 판매 서비스',
  openGraph: {
    title: 'CoPlant',
    description: '반려식물 큐레이팅 & 판매 서비스',
  },
};

export default function Home() {
  return (
    <main
      className="relative bg-apricot-200 min-h-screen overflow-hidden text-black"
      aria-labelledby="home-main-heading"
    >
      <h1 id="home-main-heading" className="sr-only">
        CoPlant 반려식물 큐레이팅 & 판매 메인 페이지
      </h1>

      <Image
        className="relative z-20 m-auto px-6"
        src="/main1.svg"
        alt="main image"
        width={1200}
        height={1000}
        priority
      />
      <Image
        src="/main-green1.svg"
        alt="green shape"
        aria-hidden="true"
        width={1200}
        height={1100}
        className="absolute right-0 top-[250px] z-10"
      />

      <section
        className="relative mt-40 flex items-center py-20 bg-apricot-400"
        aria-labelledby="intro-heading"
      >
        <div className="relative z-40 flex-1 lg:flex-[1.5] xl:flex-1">
          <Image
            src="/main-beige.svg"
            alt="intro background shape"
            aria-hidden="true"
            width={870}
            height={720}
            className="pr-6"
          />
          <div className="absolute top-7 xs:top-10 sm:top-30 md:top-50 lg:top-24 2xl:top-50 left-10">
            <p
              id="intro-heading"
              className="text-xl xs:text-2xl sm:text-3xl font-bold mb-3 xs:mb-6"
            >
              반려식물이 뭔가요?
            </p>
            <p className="leading-relaxed text-sm xs:text-base -ml-6 mr-6 xs:ml-6 xs:mr-21 md:mr-48 lg:mr-21 2xl:max-w-[700px] break-keep">
              반려식물은 ‘사람이 정서적으로 의지하고자 가까이 두고 기르는
              식물’을 일컫는 말이에요. <br />
              이름을 붙여주고 보살피며 반려식물이 성장하는 모습을 지켜보는
              과정에서 정서적으로, 신체적으로 힐링되는 효과가 있으며, 최근
              자연스러운 인테리어를 추구하는 젊은이들의 성향과 맞물려 인테리어의
              소품으로도 활용도가 높아요. 반려식물을 고를 때는 키우기 쉬우면서도
              보기에 좋고, 뛰어난 효능을 가진 것을 선택하는 게 좋답니다!
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 mr-26 z-30 drop-shadow-sm justify-end">
          <Image
            src="/main-card.svg"
            alt="카드 더미 이미지"
            width={750}
            height={720}
          />
        </div>

        <Image
          src="/main-pink1.svg"
          alt="배경 카드 장식"
          aria-hidden="true"
          width={450}
          height={400}
          className="hidden lg:block absolute bottom-0 right-0"
        />
      </section>

      <MovingLeafSection />
    </main>
  );
}
