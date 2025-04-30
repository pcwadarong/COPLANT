'use client';

import { useEffect, useState } from 'react';

import { PartialProductImageURLs } from '@/types';

import { FileInput } from '../common/file-input';

interface ImageUploaderProps {
  onChange?: (
    field: 'list' | 'cover' | 'details',
    files: File[] | null,
  ) => void;
  defaultImages?: PartialProductImageURLs;
}

export default function ImageUploader({
  onChange,
  defaultImages = {},
}: ImageUploaderProps) {
  const [detailsCount, setDetailsCount] = useState(0);
  const [previews, setPreviews] = useState<{
    list?: string;
    cover?: string;
    details: string[];
  }>({
    list: defaultImages.list,
    cover: defaultImages.cover,
    details: defaultImages.details ?? [],
  });

  useEffect(() => {
    setPreviews({
      list: defaultImages.list,
      cover: defaultImages.cover,
      details: defaultImages.details ?? [],
    });
    setDetailsCount(defaultImages.details?.length ?? 0);
  }, [defaultImages.list, defaultImages.cover, defaultImages.details]);

  const handleUpdate = (field: 'list' | 'cover' | 'details', files: File[]) => {
    const newPreviews: typeof previews = { ...previews };

    if (field === 'details')
      newPreviews.details = files.map((file) => URL.createObjectURL(file));
    else newPreviews[field] = URL.createObjectURL(files[0]);

    setPreviews(newPreviews);
    onChange?.(field, files);
  };

  return (
    <fieldset className="my-4 flex flex-col gap-4">
      <legend className="font-semibold text-lg mb-2">이미지 업로드</legend>

      <FileInput
        id="image-list"
        label="리스트 이미지"
        preview={previews.list}
        onFileChange={(files) => handleUpdate('list', files)}
      />

      <FileInput
        id="image-cover"
        label="커버 이미지"
        preview={previews.cover}
        onFileChange={(files) => handleUpdate('cover', files)}
      />

      <FileInput
        id="image-details"
        label="상세 이미지"
        multiple
        count={detailsCount}
        preview={previews.details}
        onFileChange={(files) => {
          const fileArray = Array.from(files);
          if (fileArray.length > 3) {
            alert('상세 이미지는 최대 3개까지만 업로드할 수 있습니다.');
            setDetailsCount(0);
            return;
          }
          setDetailsCount(fileArray.length);
          handleUpdate('details', fileArray);
        }}
      />
      <p className="text-sm text-stone-500 mt-1">
        ※ 상세 이미지를 새로 선택하면 기존 이미지가 모두 초기화됩니다.
      </p>
    </fieldset>
  );
}
