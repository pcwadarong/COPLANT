'use client';

import { memo } from 'react';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
}

const Counter = memo(function Counter({ value, onChange }: CounterProps) {
  const increase = () => onChange(value + 1);
  const decrease = () => onChange(Math.max(1, value - 1));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed) && parsed > 0) onChange(parsed);
  };

  return (
    <div className="flex w-36 border rounded overflow-hidden text-center text-sm h-full">
      <button
        type="button"
        onClick={decrease}
        aria-label="감소"
        className="w-1/3 py-1 text-lg hover:bg-gray-100 border-r"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-1/3 text-center border-0 focus:outline-none"
      />
      <button
        type="button"
        onClick={increase}
        aria-label="증가"
        className="w-1/3 py-1 text-lg hover:bg-gray-100 border-l"
      >
        +
      </button>
    </div>
  );
});

export default Counter;
