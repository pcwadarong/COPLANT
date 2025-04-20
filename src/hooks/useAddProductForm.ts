import { useState, useMemo, useCallback } from 'react';
import { z } from 'zod';
import imageCompression from 'browser-image-compression';

import {
  MultiSelectFilter,
  SingleSelectFilter,
  FilterState,
  ProductFormState,
} from '@/types';
import {
  addProductSchema,
  productFields,
} from '@/lib/validation/product-schema';

export function useProductForm(initialState: ProductFormState) {
  const [form, setForm] = useState<ProductFormState>({ ...initialState });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormState, string>>
  >({});

  const handleInputChange = useCallback(
    (field: keyof ProductFormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;

        setForm((prev) => {
          const updatedForm: ProductFormState = {
            ...prev,
            [field]: value,
            ...(field === 'scientificName' && {
              id: value.toLowerCase().replace(/\s+/g, '-'),
            }),
          };

          if (field in productFields.shape) {
            const typedField = field as keyof typeof productFields.shape;
            const fieldSchema = z.object({
              [typedField]: productFields.shape[typedField],
            });

            const result = fieldSchema.safeParse({ [field]: value });
            setErrors((prevErrors) => ({
              ...prevErrors,
              [field]: result.success
                ? ''
                : result.error.issues[0]?.message ?? '',
            }));
          }

          return updatedForm;
        });
      },
    [],
  );

  const handleImageChange = async (
    field: 'list' | 'cover' | 'details',
    files: File[] | null,
  ) => {
    if (!files) return;

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    if (field === 'details') {
      const compressedDetails = await Promise.all(
        Array.from(files).map((file) => imageCompression(file, options)),
      );
      setForm((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          details: compressedDetails,
        },
      }));
    } else {
      const compressed = await imageCompression(files[0], options);
      setForm((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          [field]: compressed,
        },
      }));
    }
  };

  const handleFilterChange = (
    key: keyof FilterState,
    value: string,
    isMulti: boolean,
  ) => {
    setForm((prev): ProductFormState => {
      const current = prev.filters ?? {};
      const newFilters: FilterState = {
        light: [],
        size: [],
        efficacy: [],
        feature: [],
        difficulty: '',
        water: '',
        ...current,
      };

      if (isMulti) {
        const multiKey = key as keyof MultiSelectFilter;
        const currentArr = (newFilters[multiKey] ?? []) as string[];
        const set = new Set(currentArr);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        newFilters[multiKey] = Array.from(set);
      } else {
        const singleKey = key as keyof SingleSelectFilter;
        newFilters[singleKey] = value;
      }

      return {
        ...prev,
        filters: newFilters,
      };
    });
  };

  const handleTagToggle = (tag: string) => {
    setForm((prev): ProductFormState => {
      const set = new Set(prev.tags);
      if (set.has(tag)) set.delete(tag);
      else set.add(tag);
      return { ...prev, tags: Array.from(set) };
    });
  };

  const handleTagAdd = (tag: string) => {
    setForm(
      (prev): ProductFormState => ({ ...prev, tags: [...prev.tags, tag] }),
    );
  };

  const handleTagDelete = (tag: string) => {
    setForm(
      (prev): ProductFormState => ({
        ...prev,
        tags: prev.tags.filter((t) => t !== tag),
      }),
    );
  };

  const isFormValid = useMemo(() => {
    return addProductSchema.safeParse(form).success;
  }, [form]);

  return {
    form,
    errors,
    setForm,
    setErrors,
    handleInputChange,
    handleImageChange,
    handleFilterChange,
    handleTagToggle,
    handleTagAdd,
    handleTagDelete,
    isFormValid,
  };
}
