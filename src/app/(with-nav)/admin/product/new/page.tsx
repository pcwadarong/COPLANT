'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

import FilterSelector from '../../../../../components/admin/filter-selector';
import ProductFormFields from '../../../../../components/admin/form-field';
import ImageUploader from '../../../../../components/admin/image-uploader';
import TagSelector from '../../../../../components/admin/tag-selector';

import addProductAction from '@/actions/add-product';
import { useProductForm } from '@/hooks/useCreateProductForm';
import { initialProductFormState } from '@/app/constants/product-init';

export default function CreateNewProduct() {
  const router = useRouter();

  const {
    form,
    errors,
    handleInputChange,
    handleImageChange,
    handleFilterChange,
    handleTagToggle,
    handleTagAdd,
    handleTagDelete,
    isFormValid,
  } = useProductForm(initialProductFormState);

  const [result, formAction, isPending] = useActionState(
    addProductAction,
    null,
  );

  useEffect(() => {
    if (result) {
      console.log(result);
      if (!result.status) alert(result.error);
      else router.push('/admin/product');
    }
  }, [result, router]);

  return (
    <form
      action={formAction}
      className="gap-4 max-w-3xl flex flex-col m-auto my-10 px-4"
    >
      <h1 className="text-xl font-bold">신제품 등록</h1>

      <ProductFormFields
        form={form}
        errors={errors}
        onChange={handleInputChange}
      />
      <hr className="border border-stone-400" />
      <ImageUploader onChange={handleImageChange} />
      <hr className="border border-stone-400" />
      <FilterSelector
        filters={form.filters as NonNullable<typeof form.filters>}
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
          !isFormValid || isPending
            ? 'bg-stone-300 cursor-not-allowed'
            : 'bg-apricot-300 cursor-pointer'
        }`}
      >
        {isPending ? '처리 중...' : '제출하기'}
      </button>
    </form>
  );
}
