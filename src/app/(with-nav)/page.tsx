import type { Metadata } from 'next';
import Image from 'next/image';

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
    <main className="relative bg-apricot-200 min-h-screen overflow-hidden text-black">
      <Image
        className="relative z-20 m-auto px-6"
        src="/main1.svg"
        alt="main image"
        width={1200}
        height={1000}
      />
      <Image
        src="/main-green1.png"
        alt="green shape"
        width={1200}
        height={1100}
        className="absolute right-0 top-[250px] z-10"
      />

      <section className="relative mt-40 flex items-center py-20 bg-apricot-400">
        <div className="relative z-40 flex-1 lg:flex-[1.5] xl:flex-1">
          <Image
            src="/main-beige.png"
            alt="intro background shape"
            width={870}
            height={720}
            className="pr-6"
          />
          <div className='absolute top-10 sm:top-30 md:top-50 lg:top-24 2xl:top-50 left-10'>
            <p className="text-2xl sm:text-3xl font-bold mb-6">반려식물이 뭔가요?</p>
            <p className="leading-relaxed ml-6 mr-21 md:mr-48 lg:mr-21 2xl:max-w-[700px] break-keep">
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
            src="/main-card.png"
            alt="card stack"
            width={750}
            height={720}
          />
        </div>
      </section>

      <section className="relative text-center pb-40">
        <Image
          src="/main-leaf1.png"
          alt="leaf"
          width={900}
          height={900}
          className="relative left-0 top-[-120px] z-0"
        />

        <div className="relative z-10">
          <Image
            src="/main-green2.png"
            alt="circle bg"
            width={900}
            height={900}
            className="mx-auto"
          />

          <div className="absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20">
            <p className="text-xl font-semibold mb-4">
              나에게 맞는 반려식물 찾아보기
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-sm px-4 py-1 rounded shadow">
                테스트하기
              </button>
              <button className="bg-white text-sm px-4 py-1 rounded shadow">
                제품 보기
              </button>
            </div>
          </div>
        </div>

        <Image
          src="/main-leaf2.png"
          alt="leaf right"
          width={900}
          height={900}
          className="relative bottom-[30%] right-0 z-0"
        />
      </section>
    </main>
  );
}
