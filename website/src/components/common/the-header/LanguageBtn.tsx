'use client';
import React, { useState } from 'react';
import NextImg from '../next-img';
import { cn } from '@/src/lib/utils';
import { useLocale } from 'next-intl';
import { useRouter } from '@/src/i18n/navigation';
import { routing } from '@/src/i18n/routing';

type LanguageBtnProps = {
  className?: string;
  side?: 'top' | 'bottom';
};

export default function LanguageBtn({
  className,
  side = 'bottom',
}: LanguageBtnProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locale = useLocale();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    router.push('/' as any, { locale: newLocale });
  };

  return (
    <div
      title="Chuyển đổi ngôn ngữ"
      onClick={() => setIsOpen(true)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={cn(
        'btn-menu relative flex gap-1 text-sm font-medium uppercase text-white xl:text-base',
        className,
      )}
    >
      {locale}
      <div className="relative size-4">
        <NextImg
          src="/assets/icons/arrow_down_white.svg"
          alt="icon arrow down"
        />
      </div>

      <div
        className={cn(
          'absolute right-0 z-[110] w-full origin-center transition-all duration-200',
          isOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-90 opacity-0',
          side === 'bottom' &&
            'bottom-0 translate-y-full pt-1 xl:pt-2 2xl:pt-3',
          side === 'top' && 'top-0 -translate-y-full pb-1 xl:pb-2 2xl:pb-3',
        )}
      >
        <div
          className="relative w-full overflow-hidden rounded-[6px] bg-white py-[2px]"
          style={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          {routing?.locales?.map((item: any, index: number) => {
            if (locale === item) return null;
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  switchLocale(item);
                  setIsOpen(false);
                }}
                className="w-full whitespace-nowrap text-nowrap p-[6px_10px] text-start text-sm font-medium uppercase text-black transition-all duration-100 hover:text-primary-600 2xl:p-[6px_12px] 3xl:p-[10px_16px]"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
