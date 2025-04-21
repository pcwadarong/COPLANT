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
  const {
    name,
    scientificName,
    description,
    tags,
    origin,
    humidity,
    efficacy,
    warning,
    watering,
    light,
    temperature,
    imageUrls,
    filters,
    price,
  } = data;

  const efficacyOrWarning = efficacy || warning || '정보 없음';
  const difficulty = Number(filters?.difficulty) || 0;

  return (
    <main className="relative grid grid-cols-1 sm:grid-cols-3 justify-items-center px-6 py-10">
      <div className="max-w-72 z-10">
        <div className="space-y-3 relative">
          <Image
            src="/detail-green1.svg"
            alt="장식용 배경 이미지"
            width={280}
            height={280}
            className="absolute -left-2 top-2 -z-10"
          />

          <h1 className="font-bold text-2xl mb-6">{name}</h1>
          <hr />
          <div>
            <span className="font-bold">난이도: </span>
            <span aria-label={`난이도 별 ${difficulty}개`}>
              {'☆'.repeat(difficulty)}
            </span>
          </div>
          <div>
            <span className="font-bold">학명: </span>
            <span>{scientificName}</span>
          </div>
          <p>{description}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap bg-green-400 px-1"
              >{`# ${tag}`}</span>
            ))}
          </div>

          <CartAction price={price} data={data} isMobile />
        </div>

        <div className="h-82 hidden sm:block" aria-hidden="true" />
        <InfoBlock title="Origin" content={origin} />
        <InfoBlock title="Humidity" content={humidity} />
        <Image
          src={imageUrls.details[0]}
          alt={`${name} 첫 번째 상세 이미지`}
          width={280}
          height={280}
          className="mb-10"
        />
        <InfoBlock
          title={efficacy ? 'Efficacy' : 'Warning'}
          content={efficacyOrWarning}
        />
      </div>

      <div className="hidden sm:block relative">
        <Image
          src={imageUrls.cover}
          alt={name}
          width={280}
          height={280}
          className="sticky top-20 lg:w-[320px]"
          priority
        />
      </div>

      <div className="max-w-72 z-10">
        <CartAction price={price} data={data} />
        <div className="h-72 hidden sm:block" aria-hidden="true" />
        <InfoBlock title="Watering" content={watering} />
        <Image
          src={imageUrls.details[1]}
          alt={`${name} 두 번째 상세 이미지`}
          width={280}
          height={280}
          className="mb-10"
        />
        <InfoBlock title="Light" content={light} />
        <InfoBlock title="Temperature" content={temperature} />
        <Image
          src={imageUrls.details[2]}
          alt={`${name} 세 번째 상세 이미지`}
          width={280}
          height={280}
          className="mb-10"
        />
      </div>
    </main>
  );
}
