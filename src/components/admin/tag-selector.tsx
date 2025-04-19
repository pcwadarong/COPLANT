import { useState } from 'react';
import { presetTags } from '@/app/constants/preset-tags';

interface TagSelectorProps {
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onAddCustomTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}

export default function TagSelector({
  selectedTags,
  onToggleTag,
  onAddCustomTag,
  onDeleteTag,
}: TagSelectorProps) {
  const [customTag, setCustomTag] = useState('');

  const handleAddTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      onAddCustomTag(trimmed);
    }
    setCustomTag('');
  };

  return (
    <fieldset>
      <legend className="font-semibold text-lg">태그</legend>

      <div className="flex flex-wrap gap-2 my-4 text-sm">
        {presetTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            className={`px-2 py-1 rounded border border-stone-400 cursor-pointer hover:bg-stone-400/20 ${
              selectedTags.includes(tag) ? 'hidden' : 'inline-block'
            }`}
            aria-label={`태그 ${tag} ${
              selectedTags.includes(tag) ? '삭제' : '추가'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag();
            }
          }}
          placeholder="태그 추가"
          aria-label="사용자 정의 태그 입력"
          className="border p-2 rounded border-stone-400 flex-1"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-3 py-2 rounded bg-apricot-300"
        >
          추가
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag, idx) => (
          <span
            key={tag}
            className="flex px-3 py-1 items-center gap-1 bg-green-300 border border-stone-300 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => onDeleteTag(tag)}
              aria-label={`${tag} 삭제`}
              className="ml-1 text-stone-500 hover:text-red-600 hover:cursor-pointer"
            >
              &times;
            </button>
            <input key={idx} type="hidden" name="tags" value={tag} />
          </span>
        ))}
      </div>
    </fieldset>
  );
}
