import { useEffect } from 'react';

export const UseLockBodyScroll = (lock: boolean) => {
  useEffect(() => {
    if (lock) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [lock]);
};
