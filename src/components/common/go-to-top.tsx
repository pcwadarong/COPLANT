'use client';

import { useEffect, useState } from 'react';

const GoToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="맨 위로 이동"
      className="fixed bottom-6 right-6 z-[100] bg-white shadow-xl rounded-full p-3 transition hover:bg-stone-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-stone-700"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
};

export default GoToTopButton;
