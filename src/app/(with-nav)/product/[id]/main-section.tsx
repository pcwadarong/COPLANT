'use client';

import Image from 'next/image';
import CartAction from './cart-action';
import InfoBlock from './info-block';
import { ProductProperties } from '@/types';

export default function ProductMainSection({
  data,
}: {
  data: ProductProperties;
}) {
  return (
    <main className="relative grid grid-cols-1 sm:grid-cols-3 justify-items-center px-6 py-10">
      {/* Left Column */}
      <div className="max-w-72 z-10">
        <div className="space-y-3 relative">
          <Image
            src="/detail-green1.svg"
            alt="shape"
            width={280}
            height={280}
            className="absolute -left-2 top-2 -z-10"
          />

          <h1 className="font-bold text-2xl mb-6">{data.name}</h1>
          <hr />
          <div>
            <span className="font-bold">난이도: </span>
            <span>{'☆'.repeat(Number(data.filters?.difficulty))}</span>
          </div>
          <div>
            <span className="font-bold">학명: </span>
            <span>{data.scientificName}</span>
          </div>
          <p>{data.description}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {data.tags.map((item) => (
              <span
                key={item}
                className="whitespace-nowrap bg-green-400 px-1"
              >{`# ${item}`}</span>
            ))}
          </div>

          <CartAction price={data.price} data={data} isMobile />
        </div>

        <div className="h-82 hidden sm:block"></div>
        <InfoBlock title="Origin" content={data.origin} />
        <InfoBlock title="Humidity" content={data.humidity} />
        <Image
          src={data.imageUrls.details[0]}
          alt={`${data.name} 첫 번째 상세 이미지`}
          width={280}
          height={280}
          className="mb-10"
        />
        <InfoBlock
          title={data.efficacy ? 'Efficacy' : 'Warning'}
          content={data.efficacy || data.warning || '정보 없음'}
        />
      </div>

      {/* Middle Sticky Image - 모바일에서는 숨김 */}
      <div className="hidden sm:block relative">
        <Image
          src={data.imageUrls.cover}
          alt={data.name}
          width={280}
          height={280}
          className="sticky top-20 lg:w-[320px]"
        />
      </div>

      {/* Right Column */}
      <div className="max-w-72 z-10">
        <CartAction price={data.price} data={data} />
        <div className="h-72 hidden sm:block"></div>
        <InfoBlock title="Watering" content={data.watering} />
        <Image
          src={data.imageUrls.details[1]}
          alt={`${data.name} 두 번째 상세 이미지`}
          width={280}
          height={280}
          className="mb-10"
        />
        <InfoBlock title="Light" content={data.light} />
        <InfoBlock title="Temperature" content={data.temperature} />
        <Image
          src={data.imageUrls.details[2]}
          alt={`${data.name} 세 번째 상세 이미지`}
          width={280}
          height={280}
          className="mb-10"
        />
      </div>
    </main>
  );
}
