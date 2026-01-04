'use client';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { usePathname } from 'next/navigation';
import { useScrollSmoother } from '@/src/providers/ScrollSmootherProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function ScrollSmoothWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { setSmoother } = useScrollSmoother();

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        content: '#smooth-content',
        wrapper: '#smooth-wrapper',
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        ignoreMobileResize: true,
        normalizeScroll: {
          target: '.scrollable-area',
          allowNestedScroll: true,
          lockAxis: true,
          allowClicks: true,
        },
      });

      setSmoother(smoother);

      // Xử lí cuộn tới các section qua các link có href chứa #
      gsap.utils.toArray('a[href^="#"]').forEach(function (button: any, i) {
        button.addEventListener('click', (e: any) => {
          e.preventDefault();
          const targetEl = e.target.getAttribute('href');
          smoother.scrollTo(targetEl, true, 'top top');
        });
      });

      window.addEventListener('load', () => {
        let urlHash = window.location.href.split('#')[1];
        let scrollElem = document.querySelector('#' + urlHash);
        if (urlHash && scrollElem) {
          gsap.to(smoother, {
            scrollTop: smoother.offset(scrollElem, 'top top'),
            duration: 1,
            delay: 0.5,
          });
        }
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  // check khi page thay đổi chiều cao sẽ refesh scrolltrigger
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    const content = document.querySelector('#check-content');
    if (content) {
      observer.observe(content);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div
        id="smooth-content"
        className="w-full overflow-hidden will-change-transform"
      >
        <div id="check-content" className="relative w-full overflow-hidden">
          <div className="scrollable-area hidden"></div>
          {children}
        </div>
      </div>
    </div>
  );
}
