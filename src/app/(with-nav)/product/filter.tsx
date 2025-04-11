'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { options } from '@/app/constants/filterOptions';
import CustomCheckbox from '@/components/common/customCheckbox';

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckboxChange = (category: string, value: string) => {
    // searchParams는 read-only기 때문에 수정을 위해 복제함
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.get(category)?.split(',') || [];

    const updated = existing.includes(value)
      ? existing.filter((v) => v !== value) //원래 있다면 체크해제하고, 나머지
      : [...existing, value]; // 없다면 existing에 value를 추가

    if (updated.length > 0) params.set(category, updated.join(','));
    else params.delete(category);

    router.push(`?${params.toString()}`);
  };

  const isChecked = (category: string, value: string) => {
    const selected = searchParams.get(category)?.split(',') || [];
    return selected.includes(value);
  };

  const resetFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(options).forEach((key) => params.delete(key));
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <button
        className="text-sm underline underline-offset-4 mb-5"
        onClick={resetFilter}
      >
        필터 초기화
      </button>
      <form>
        {Object.entries(options).map(([category, { legend, items }]) => (
          <fieldset key={category} className="border-b-[1px]">
            <legend className="font-bold">{legend}</legend>
            {items.map(({ label, value }) => (
              <CustomCheckbox
                key={label}
                id={value}
                label={label}
                bgColor="yellow"
                bgCheckedColor="green"
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
