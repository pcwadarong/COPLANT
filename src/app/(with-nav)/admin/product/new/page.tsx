'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

import addProductAction from '@/actions/add-product';
import { options } from '@/app/constants/filterOptions';
import { ProductProperties, FilterState } from '@/types';

const defaultFilters: FilterState = {
  difficulty: '',
  water: '',
  light: [],
  size: [],
  efficacy: [],
  feature: [],
};

const presetTags = [
  '초보추천',
  '잎을 감상하는',
  '선물용',
  '낮은 조도',
  '반려동물에게 안전한',
  '잎이 두꺼운',
  '목대 있는',
  '튼튼함',
  '빛이 적어도 되는',
  '물이 적어도 되는',
  '하트모양 잎',
];

export default function AdminPage() {
  const router = useRouter();

  const [form, setForm] = useState<ProductProperties>({
    id: '',
    name: '',
    price: 0,
    description: '',
    scientificName: '',
    origin: '',
    efficacy: '',
    humidity: '',
    light: '',
    filters: defaultFilters,
    tags: [],
  });

  const [customTag, setCustomTag] = useState('');
  const [result, formAction, isPending] = useActionState(
    addProductAction,
    null,
  );

  useEffect(() => {
    if (result) {
      if (!result.status) alert(result.error);
      else {
        router.push('/admin/product');
      }
    }
  }, [result]);

  const handleInputChange =
    (field: keyof ProductProperties) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      const id =
        field === 'scientificName'
          ? value.toLowerCase().replace(/\s+/g, '-')
          : form.id;
      setForm((prev) => ({
        ...prev,
        [field]: value,
        ...(field === 'scientificName' && { id }),
      }));
    };

  const handleFilterChange = (
    key: keyof FilterState,
    value: string,
    isMulti: boolean,
  ) => {
    setForm((prev) => {
      const current = prev.filters ?? defaultFilters;
      if (isMulti) {
        const set = new Set(current[key] as string[]);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        return { ...prev, filters: { ...current, [key]: Array.from(set) } };
      } else {
        return { ...prev, filters: { ...current, [key]: value } };
      }
    });
  };

  const handleTagClick = (tag: string) => {
    setForm((prev) => {
      const set = new Set(prev.tags);
      if (set.has(tag)) set.delete(tag);
        else set.add(tag);
      return { ...prev, tags: Array.from(set) };
    });
  };

  const handleCustomTagAdd = () => {
    if (customTag.trim() && !form.tags.includes(customTag.trim())) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, customTag.trim()] }));
    }
    setCustomTag('');
  };

  const isFormValid =
    form.name && form.scientificName && form.price && form.description;

  return (
    <form action={formAction} className="space-y-4">
      <h1 className="text-xl font-bold">신제품 등록</h1>

      <input
        placeholder="상품명"
        value={form.name}
        onChange={handleInputChange('name')}
        required
      />
      <textarea
        placeholder="설명"
        value={form.description}
        onChange={handleInputChange('description')}
        required
      />
      <input
        placeholder="가격"
        type="number"
        value={form.price}
        onChange={handleInputChange('price')}
      />

      <input
        placeholder="학명"
        value={form.scientificName}
        onChange={handleInputChange('scientificName')}
      />
      <textarea
        placeholder="원산지"
        value={form.origin}
        onChange={handleInputChange('origin')}
      />
      <textarea
        placeholder="효능"
        value={form.efficacy}
        onChange={handleInputChange('efficacy')}
      />
      <textarea
        placeholder="습도"
        value={form.humidity}
        onChange={handleInputChange('humidity')}
      />
      <textarea
        placeholder="빛"
        value={form.light}
        onChange={handleInputChange('light')}
      />

      <fieldset>
        <legend>필터</legend>
        {Object.entries(options).map(([key, { legend, items }]) => {
          const isMulti = Array.isArray(
            defaultFilters[key as keyof FilterState],
          );
          return (
            <div key={key}>
              <p>{legend}</p>
              {items.map(({ label, value }) => (
                <label key={value}>
                  <input
                    type={isMulti ? 'checkbox' : 'radio'}
                    name={key}
                    value={value}
                    checked={
                      isMulti
                        ? form.filters?.[key as keyof FilterState]?.includes(
                            value,
                          )
                        : form.filters?.[key as keyof FilterState] === value
                    }
                    onChange={() =>
                      handleFilterChange(
                        key as keyof FilterState,
                        value,
                        isMulti,
                      )
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          );
        })}
      </fieldset>

      <fieldset>
        <legend>태그</legend>
        <div className="flex flex-wrap gap-2">
          {presetTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={`px-2 py-1 rounded border ${
                form.tags.includes(tag) ? 'bg-green-200' : 'bg-gray-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            placeholder="태그 추가"
          />
          <button type="button" onClick={handleCustomTagAdd}>
            추가
          </button>
        </div>
      </fieldset>

      <button type="submit" disabled={!isFormValid || isPending}>
        {isPending ? '처리 중...' : '제출하기'}
      </button>
    </form>
  );
}
