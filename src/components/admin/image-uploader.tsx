'use client';

import React, { useState } from 'react';

interface ImageUploaderProps {
  onChange?: (
    field: 'list' | 'cover' | 'details',
    files: FileList | null,
  ) => void;
}

interface FileInputProps {
  id: string;
  label: string;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  count?: number;
}

const FileInput = ({
  id,
  label,
  multiple = false,
  onChange,
  count,
}: FileInputProps) => (
  <div>
    <label htmlFor={id} className="block font-medium mb-2">
      {label}{' '}
      {typeof count === 'number' && (
        <span className="text-sm text-gray-500">({count}/3)</span>
      )}
    </label>
    <input
      type="file"
      name={id}
      id={id}
      accept="image/*"
      multiple={multiple}
      required
      className="file:bg-stone-100 file:rounded-lg file:border file:px-3 file:py-1 text-sm file:font-semibold file:cursor-pointer"
      onChange={onChange}
    />
  </div>
);

export default function ImageUploader({ onChange }: ImageUploaderProps) {
  const [detailCount, setDetailCount] = useState(0);

  return (
    <fieldset className="my-4 flex flex-col gap-4">
      <legend className="font-semibold text-lg mb-2">이미지 업로드</legend>

      <FileInput
        id="image-list"
        label="리스트 이미지"
        onChange={(e) => onChange?.('list', e.target.files)}
      />

      <FileInput
        id="image-cover"
        label="커버 이미지"
        onChange={(e) => onChange?.('cover', e.target.files)}
      />

      <FileInput
        id="image-details"
        label="상세 이미지"
        multiple
        count={detailCount}
        onChange={(e) => {
          const files = e.target.files;
          const fileCount = files?.length || 0;
          if (fileCount > 3) {
            alert('상세 이미지는 최대 3개까지만 업로드할 수 있습니다.');
            e.target.value = '';
            setDetailCount(0);
            return;
          }
          setDetailCount(fileCount);
          onChange?.('details', files);
        }}
      />
    </fieldset>
  );
}
