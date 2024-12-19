import { useEffect } from 'react';

export function useClickAway(refs, handler) {
  useEffect(() => {
    const handleClick = (event) => {
      const isOutside = refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target);
      });

      if (isOutside) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [refs, handler]);
}
