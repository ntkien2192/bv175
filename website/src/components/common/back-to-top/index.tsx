'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import NextImg from '../next-img';
import ContactFixed from '../contact-fixed';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function BackToTop() {
  const containerRef = useRef<any>(null);
  const backToTopRef = useRef<any>(null);
  const contactRef = useRef<any>(null!);
  const wrapperRef = useRef<any>(null!);
  const pathname = usePathname();

  const { contextSafe } = useGSAP(
    () => {
      if (!containerRef.current || !backToTopRef.current) return;

      const mm = gsap.matchMedia();

      gsap.set(backToTopRef.current, {
        yPercent: 300,
        opacity: 1,
      });
      gsap.set(contactRef.current, {
        yPercent: 130,
        opacity: 1,
      });

      mm.add('(max-width: 767px)', () => {
        gsap.set(wrapperRef.current, {
          bottom: 70,
        });

        ScrollTrigger.create({
          onUpdate: (self) => {
            if (self.direction === 1) {
              // cuộn xuống
              gsap.to(wrapperRef.current, {
                bottom: 140,
                duration: 0.5,
                ease: 'power2.out',
              });
            } else {
              gsap.to(wrapperRef.current, {
                bottom: 70,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          },
        });
      });

      ScrollTrigger.create({
        start: 100,
        onEnter: () => {
          gsap.to(backToTopRef.current, {
            yPercent: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
          gsap.to(contactRef.current, {
            yPercent: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        },

        onLeaveBack: () => {
          gsap.to(backToTopRef.current, {
            yPercent: 300,
            duration: 0.5,
            ease: 'power2.out',
          });
          gsap.to(contactRef.current, {
            yPercent: 130,
            duration: 0.5,
            ease: 'power2.out',
          });
        },
      });
    },
    { scope: containerRef, dependencies: [pathname] },
  );

  const handleScrollTo = contextSafe(() => {
    gsap.to(backToTopRef.current, {
      keyframes: {
        scale: [0.9, 1],
      },
      ease: 'bounce',
      duration: 1.5,
    });
    gsap.to(window, {
      scrollTo: {
        y: 0,
        autoKill: false,
      },
      duration: 1.5,
      ease: 'power3.out',
    });
  });

  return (
    <div ref={containerRef}>
      <div
        ref={wrapperRef}
        className="fixed right-6 z-50 flex flex-col items-center gap-2 md:bottom-8 md:right-8 lg:bottom-6 lg:right-6 xl:gap-2.5 3xl:gap-3 3xl:bottom-8 3xl:right-8"
      >
        <div ref={contactRef}>
          <ContactFixed />
        </div>

        <div
          ref={backToTopRef}
          onClick={() => handleScrollTo()}
          className="flex size-12 cursor-pointer items-center justify-center rounded-[6px] bg-white opacity-0 hover:bg-primary-100 lg:size-11 xl:size-12"
          style={{
            boxShadow:
              '0 10px 12.5px -2.5px rgba(18, 26, 43, 0.05), 0 3.333px 5px -2.5px rgba(18, 26, 43, 0.05)',
          }}
        >
          <div className="relative size-6 -rotate-90">
            <NextImg
              src="/assets/icons/arrow_right_black.svg"
              alt="arrow_right_black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
