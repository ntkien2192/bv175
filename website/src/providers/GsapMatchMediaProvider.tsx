'use client';

import React, { createContext, useContext, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

type GsapMatchMediaContextType = {
  conditions: gsap.Conditions | undefined;
};

const GsapMatchMediaContext = createContext<GsapMatchMediaContextType>({
  conditions: undefined,
});

export const useGsapMatchMedia = () => useContext(GsapMatchMediaContext);

export function GsapMatchMediaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conditions, setConditions] = useState<gsap.Conditions | undefined>(
    undefined,
  );

  useGSAP(() => {
    if (typeof window !== 'undefined') {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isXS: '(max-width: 767px)',
          isMD: '(min-width: 768px) and (max-width: 1023px)',
          isLG: '(min-width: 1024px) and (max-width: 1279px)',
          isXL: '(min-width: 1280px) and (max-width: 1439px)',
          is2XL: '(min-width: 1440px) and (max-width: 1599px)',
          is3XL: '(min-width: 1600px) and (max-width: 1919px)',
          is4XL: '(min-width: 1920px)',
        },
        (context) => {
          setConditions(context.conditions);
        },
      );
    }
  }, []);

  return (
    <GsapMatchMediaContext.Provider value={{ conditions }}>
      {children}
    </GsapMatchMediaContext.Provider>
  );
}
