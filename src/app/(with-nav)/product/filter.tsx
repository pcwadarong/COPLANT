'use client';

import { useCallback, useMemo, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { options } from '@/app/constants/filter-options';
import CustomCheckbox from '@/components/common/checkbox';

export default function Filter() {
  const router = useRouter();
  const [isOpened, setIsOpen] = useState(true);

  // 1.
  const searchParams = useSearchParams();

  // 2. 조회 전용 데이터로 가공하여 만든 객체 ex) light: ['sun', 'shadow']
  const selectedFilters = useMemo(() => {
    const entries: Record<string, string[]> = {};
    for (const [key, value] of searchParams.entries()) {
      entries[key] = value.split(',');
    }
    return entries;
  }, [searchParams]);

  const handleCheckboxChange = useCallback(
    (category: string, value: string) => {
      // searchParams는 read-only기 때문에 수정을 위해 복제함
      const params = new URLSearchParams(searchParams.toString());
      const existing = params.get(category)?.split(',') || [];

      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value) //원래 있다면 체크해제하고, 나머지
        : [...existing, value]; // 없다면 existing에 value를 추가

      if (updated.length > 0) params.set(category, updated.join(','));
      else params.delete(category);

      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  const isChecked = useCallback(
    (category: string, value: string) =>
      selectedFilters[category]?.includes(value) ?? false,
    [selectedFilters],
  );

  const resetFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(options).forEach((key) => params.delete(key));
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  return (
    <>
      <button
        className="text-sm underline underline-offset-4 mb-5"
        onClick={resetFilter}
      >
        필터 초기화
      </button>
      <button
        className="ml-3 text-sm underline underline-offset-4 xs:hidden"
        onClick={() => setIsOpen(!isOpened)}
      >
        {`필터 ${isOpened ? '닫기' : '열기'}`}
      </button>
      {isOpened && (
        <form aria-label="식물 필터" className="mb-10 xs:hidden">
          {Object.entries(options).map(([category, { legend, items }]) => (
            <fieldset
              key={category}
              className="border-b flex flex-wrap xs:flex-col gap-2 py-3"
            >
              <legend className="font-bold pt-3">{legend}</legend>
              {items.map(({ label, value }) => (
                <CustomCheckbox
                  key={label}
                  id={value}
                  label={label}
                  checked={isChecked(category, value)}
                  onChange={() => handleCheckboxChange(category, value)}
                />
              ))}
            </fieldset>
          ))}
        </form>
      )}

      <form aria-label="식물 필터" className="mb-10 hidden xs:block">
        {Object.entries(options).map(([category, { legend, items }]) => (
          <fieldset
            key={category}
            className="border-b flex flex-wrap xs:flex-col gap-2 py-3"
          >
            <legend className="font-bold pt-3">{legend}</legend>
            {items.map(({ label, value }) => (
              <CustomCheckbox
                key={label}
                id={value}
                label={label}
                checked={isChecked(category, value)}
                onChange={() => handleCheckboxChange(category, value)}
              />
            ))}
          </fieldset>
        ))}
      </form>
    </>
  );
}
