'use client';

import { memo, useCallback, useState } from 'react';

const Counter = memo(function Counter() {
  const [quantity, setQuantity] = useState(1);

  const increase = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const decrease = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1));
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) setQuantity(value);
  }, []);

  return (
    <>
      <div className="flex w-36 border rounded overflow-hidden text-center h-full">
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
          value={quantity}
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
    </>
  );
});

export default Counter;
