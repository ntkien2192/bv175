'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  innerText: number;
  snap: number;
  className?: string;
  children?: React.ReactNode;
  animateOnScroll?: boolean;
  start?: string | number | ScrollTrigger.StartEndFunc;
  end?: string | number | ScrollTrigger.StartEndFunc;
  duration?: number | undefined;
  once?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
  [key: string]: any;
};

export default function Counter({
  innerText,
  snap,
  className,
  children,
  animateOnScroll = true,
  start = 'clamp(top 90%)',
  end = 'clamp(top 90%)',
  duration = 1,
  once = false,
  onAnimationStart,
  onAnimationComplete,
  ...props
}: Props) {
  const containerRef = useRef<any>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const elements = gsap.utils.toArray(
        '[data-aos="true"]',
        containerRef.current,
      ) as HTMLElement[];

      gsap.to(elements, {
        innerText,
        duration,
        snap: {
          innerText: snap,
        },
        ease: 'power3.out',
        ...(animateOnScroll && {
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            once,
          },
        }),
        onStart: () => {
          onAnimationStart?.();
        },
        onComplete: () => {
          onAnimationComplete?.();
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, once, onAnimationComplete],
    },
  );

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn('perspective-[400px] block', className)}
    >
      {children}
    </div>
  );
}
