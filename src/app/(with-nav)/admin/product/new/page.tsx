'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

import { LabeledInput, LabeledTextarea } from '@/components/common/labelInput';
import CustomCheckbox from '@/components/common/customCheckbox';

import addProductAction from '@/actions/add-product';
import { options } from '@/app/constants/filterOptions';
import { presetTags } from '@/app/constants/presetTags';
import { ProductProperties, FilterState } from '@/types';

const defaultFilters: FilterState = {
  difficulty: '',
  water: '',
  light: [],
  size: [],
  efficacy: [],
  feature: [],
};

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
      else router.push('/admin/product');
    }
  }, [result, router]);

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
    <form
      action={formAction}
      className="gap-4 max-w-3xl flex flex-col m-auto my-10 px-4"
    >
      <h1 className="text-xl font-bold">신제품 등록</h1>

      <LabeledInput
        id="name"
        label="상품명"
        value={form.name}
        onChange={handleInputChange('name')}
        required
      />
      <LabeledInput
        id="scientificName"
        label="학명"
        value={form.scientificName}
        onChange={handleInputChange('scientificName')}
      />
      <LabeledTextarea
        id="description"
        label="상품 설명"
        value={form.description}
        onChange={handleInputChange('description')}
        required
      />
      <LabeledInput
        id="price"
        label="상품 가격"
        value={form.price}
        onChange={handleInputChange('price')}
        type="number"
      />
      <LabeledTextarea
        id="origin"
        label="원산지"
        value={form.origin}
        onChange={handleInputChange('origin')}
      />
      <LabeledTextarea
        id="efficacy"
        label="효능"
        value={form.efficacy}
        onChange={handleInputChange('efficacy')}
      />
      <LabeledTextarea
        id="humidity"
        label="습도"
        value={form.humidity}
        onChange={handleInputChange('humidity')}
      />
      <LabeledTextarea
        id="light"
        label="빛"
        value={form.light}
        onChange={handleInputChange('light')}
      />

      <fieldset>
        <legend className="font-bold text-lg">필터</legend>
        {Object.entries(options).map(([key, { legend, items }]) => {
          const isMulti = Array.isArray(
            defaultFilters[key as keyof FilterState],
          );
          return (
            <div key={key} className="my-2">
              <p>{legend}</p>
              <div className="flex flex-wrap gap-4">
                {items.map(({ label, value }) => (
                  <label key={value} className="flex items-center gap-1">
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
                      aria-label={`${legend} - ${label}`}
                    />
                    {label}
                  </label>
                ))}
              </div>
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
              aria-label={`태그 ${tag} ${
                form.tags.includes(tag) ? '삭제' : '추가'
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
            aria-label="사용자 정의 태그 입력"
            className="border p-2 rounded border-gray-400"
          />
          <button type="button" onClick={handleCustomTagAdd}>
            추가
          </button>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={!isFormValid || isPending}
        className={` rounded p-2 ${
          !isFormValid || isPending ? 'bg-gray-300' : 'bg-apricot-300'
        }`}
      >
        {isPending ? '처리 중...' : '제출하기'}
      </button>
    </form>
  );
}
