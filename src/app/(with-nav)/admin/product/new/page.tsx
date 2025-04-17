'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

import FilterSelector from '../../../../../components/admin/filterSelector';
import ProductFormFields from '../../../../../components/admin/formField';
import ImageUploader from '../../../../../components/admin/ImageUploader';
import TagSelector from '../../../../../components/admin/tagSelector';

import addProductAction from '@/actions/add-product';
import { ProductFormState, FilterState } from '@/types';

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

  const [form, setForm] = useState<ProductFormState>({
    id: '',
    name: '',
    price: 0,
    description: '',
    scientificName: '',
    origin: '',
    warning: '',
    efficacy: '',
    humidity: '',
    light: '',
    images: {
      list: undefined,
      cover: undefined,
      details: [],
    },
    filters: defaultFilters,
    tags: [],
  });

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
    (field: keyof ProductFormState) =>
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

  const handleImageChange = (
    field: 'list' | 'cover' | 'details',
    files: FileList | null,
  ) => {
    if (!files) return;

    setForm((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [field]: field === 'details' ? Array.from(files) : files[0],
      },
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

  const handleTagToggle = (tag: string) => {
    setForm((prev) => {
      const set = new Set(prev.tags);
      if (set.has(tag)) set.delete(tag);
      else set.add(tag);
      return { ...prev, tags: Array.from(set) };
    });
  };

  const handleTagAdd = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  };

  const handleTagDelete = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const isFormValid =
    form.name && form.scientificName && form.price && form.description;

  return (
    <form
      action={formAction}
      className="gap-4 max-w-3xl flex flex-col m-auto my-10 px-4"
    >
      <h1 className="text-xl font-bold">신제품 등록</h1>

      <ProductFormFields form={form} onChange={handleInputChange} />
      <hr className="border border-stone-400" />
      <ImageUploader onChange={handleImageChange} />
      <hr className="border border-stone-400" />
      <FilterSelector
        filters={form.filters ?? defaultFilters}
        onChange={handleFilterChange}
      />
      <hr className="border border-stone-400" />
      <TagSelector
        selectedTags={form.tags}
        onToggleTag={handleTagToggle}
        onAddCustomTag={handleTagAdd}
        onDeleteTag={handleTagDelete}
      />

      <button
        type="submit"
        disabled={!isFormValid || isPending}
        className={` rounded p-2 mt-6 ${
          !isFormValid || isPending ? 'bg-stone-300' : 'bg-apricot-300'
        }`}
      >
        {isPending ? '처리 중...' : '제출하기'}
      </button>
    </form>
  );
}
