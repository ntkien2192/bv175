'use client';

import React, { createContext, useContext, useState } from 'react';
import type { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

type ScrollSmootherContextType = {
  smoother: ScrollSmoother | null;
  setSmoother: (smoother: ScrollSmoother) => void;
};

const ScrollSmootherContext = createContext<ScrollSmootherContextType>({
  smoother: null,
  setSmoother: () => {},
});

export const useScrollSmoother = () => useContext(ScrollSmootherContext);

export function ScrollSmootherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  return (
    <ScrollSmootherContext.Provider value={{ smoother, setSmoother }}>
      {children}
    </ScrollSmootherContext.Provider>
  );
}
