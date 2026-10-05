'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the user's prefers-reduced-motion media query.
 * Returns true if the user has opted into reduced motion (or during SSR by default).
 */
export function useReducedMotion(defaultValue = false) {
  const [reduced, setReduced] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
