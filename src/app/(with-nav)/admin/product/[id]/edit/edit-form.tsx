'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

import FilterSelector from '@/components/admin/filter-selector';
import ProductFormFields from '@/components/admin/form-field';
import ImageUploader from '@/components/admin/image-uploader';
import TagSelector from '@/components/admin/tag-selector';

import updateProductAction from '@/actions/update-product';
import { useEditProductForm } from '@/hooks/useEditProductForm';
import { ProductProperties } from '@/types';

export default function EditProductPage({
  product,
}: {
  product: ProductProperties;
}) {
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
  } = useEditProductForm(product);

  const [result, formAction, isPending] = useActionState(
    updateProductAction,
    null,
  );

  useEffect(() => {
    if (result) {
      if (!result.status) alert(result.error);
      else router.push('/admin/product');
    }
  }, [result, router]);

  return (
    <form
      action={formAction}
      className="gap-4 max-w-3xl flex flex-col m-auto my-10 px-4"
    >
      <h1 className="text-xl font-bold">상품 수정</h1>

      <ProductFormFields
        form={form}
        errors={errors}
        onChange={handleInputChange}
        isEditMode={true}
      />
      <hr className="border border-stone-400" />
      <ImageUploader
        onChange={(field, files) => {
          if (!files) return;
          const array = Array.from(files);
          handleImageChange(field, array);
        }}
        defaultImages={product.imageUrls}
      />
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
        {isPending ? '처리 중...' : '수정 완료'}
      </button>
    </form>
  );
}
