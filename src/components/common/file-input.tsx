'use client'

import Image from 'next/image';

interface FileInputProps {
  id: string;
  label: string;
  multiple?: boolean;
  preview?: string | string[];
  onFileChange: (files: File[]) => void;
  count?: number;
}

interface PreviewProps {
  id: string;
  preview?: string | string[];
}

const PreviewImages = ({ id, preview }: PreviewProps) => (
  <div className="my-2 flex gap-2 flex-wrap">
    {Array.isArray(preview) ? (
      preview.map((src, i) => (
        <div key={i} className="relative rounded border">
          <Image
            src={src}
            alt={`${id}-preview-${i}`}
            width={96}
            height={96}
            className="object-cover rounded"
          />
        </div>
      ))
    ) : (
      <div className="relative rounded border">
        <Image
          src={preview!}
          alt={`${id}-preview`}
          width={96}
          height={96}
          className="object-cover rounded"
        />
      </div>
    )}
  </div>
);

export const FileInput = ({
  id,
  label,
  multiple = false,
  preview,
  onFileChange,
  count,
}: FileInputProps) => (
  <div>
    <label htmlFor={id} className="block font-medium mb-2">
      {label}
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
      className="file:bg-stone-100 file:rounded-lg file:border file:px-3 file:py-1 text-sm file:font-semibold file:cursor-pointer"
      onChange={(e) => {
        const files = Array.from(e.target.files || []);
        if (!multiple && files.length > 1) return;
        onFileChange(files);
      }}
    />
    {preview && <PreviewImages id={id} preview={preview} />}
  </div>
);
