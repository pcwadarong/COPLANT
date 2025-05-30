'use client';

import { useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import updateProductAction from '@/actions/update-product';
import { INITIAL_ACTION_STATE } from '@/app/constants/states';
import FilterSelector from '@/components/admin/filter-selector';
import ProductFormFields from '@/components/admin/form-field';
import ImageUploader from '@/components/admin/image-uploader';
import TagSelector from '@/components/admin/tag-selector';
import CustomButton from '@/components/common/button';
import { useEditProductForm } from '@/hooks/useEditProductForm';
import { ActionState, ProductProperties } from '@/types';

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

  const [result, formAction, isPending] = useActionState<ActionState, FormData>(
    updateProductAction,
    INITIAL_ACTION_STATE,
  );

  useEffect(() => {
    if (result) {
      if (!result.status) console.log(result.error);
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

      <CustomButton type="submit" disabled={!isFormValid} isPending={isPending}>
        수정하기
      </CustomButton>
    </form>
  );
}
