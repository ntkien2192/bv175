'use client';
import React, { useMemo, useState } from 'react';
import NextImg from '../next-img';
import {
  TooltipProvider,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
  TooltipArrow,
} from '../../ui/tooltip';
import { useMetadata } from '@/src/providers/MetadataProvider';
import { useTranslations } from 'next-intl';

export default function ContactFixed() {
  const metadata = useMetadata();
  const contact_information = metadata?.contact_information;
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const t = useTranslations();

  const data = useMemo(
    () => [
      {
        title: t('Contact.hotline', { hotline: contact_information?.hot_line }),
        icon: '/assets/icons/phone_contact.svg',
        url: contact_information?.hot_line_url || '/',
        bgColor: '#63A978',
        isTargetBlank: false,
      },
      {
        title: t('Contact.book-app'),
        icon: '/assets/icons/calendar_contact.svg',
        url: contact_information?.googleplay_url || '/',
        bgColor: '#E50000',
        isTargetBlank: true,
      },
      {
        title: t('Contact.schedule-demand'),
        icon: '/assets/icons/zalo_contact.svg',
        url: contact_information?.medical_appointment_url || '/',
        bgColor: '#60A5FA',
        isTargetBlank: true,
      },
      {
        title: t('Contact.fanpage'),
        icon: '/assets/icons/fb_contact.svg',
        url: contact_information?.facebook_url || '/',
        bgColor: '#1877F2',
        isTargetBlank: true,
      },
      {
        title: t('Contact.email-btn', { email: contact_information?.email }),
        icon: '/assets/icons/mail_contact.svg',
        url: contact_information?.email_url || '/',
        bgColor: '#F97316',
        isTargetBlank: false,
      },
    ],
    [contact_information],
  );

  return (
    <div
      className="relative z-[50]"
      style={{
        boxShadow:
          '0 10px 12.5px -2.5px rgba(18, 26, 43, 0.05), 0 3.333px 5px -2.5px rgba(18, 26, 43, 0.05)',
      }}
    >
      <TooltipProvider delayDuration={100}>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsOpenMenu((prev: boolean) => !prev)}
              className="relative z-[51] flex size-12 cursor-pointer items-center justify-center rounded-[6px] bg-[#E50000] lg:size-11 xl:size-12"
            >
              <div className={`relative size-6`}>
                <NextImg
                  src="/assets/icons/phone_contact.svg"
                  alt="plus icon"
                />
              </div>
            </button>
          </TooltipTrigger>

          <TooltipContent
            side="right"
            align="center"
            className="rounded-md bg-[#E50000] p-[6px_8px] text-sm text-white xl:text-base"
          >
            {isOpenMenu ? t('Common.close') : t('Contact.title')}
            <TooltipArrow className="fill-[#E50000]" />
          </TooltipContent>
        </TooltipRoot>

        <div
          className={`${isOpenMenu ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-0 top-0 z-[50] flex -translate-y-full flex-col gap-2 pb-2 xl:gap-2.5 xl:pb-3 3xl:gap-3`}
        >
          {data?.map((item: any, index: number) => (
            <div
              key={index}
              className={`${isOpenMenu ? 'translate-y-0 opacity-100' : 'translate-y-[80%] opacity-0'} transition-all duration-200`}
              style={{
                transitionDelay: `${(data?.length - index) * 50}ms`,
              }}
            >
              <TooltipRoot open={isOpenMenu} delayDuration={1000}>
                <TooltipTrigger asChild>
                  <a
                    target={item?.isTargetBlank ? '_blank' : undefined}
                    rel={item?.isTargetBlank ? 'noopener' : undefined}
                    href={item?.url}
                    className="relative flex size-12 cursor-pointer items-center justify-center rounded-[6px] lg:size-11 xl:size-12"
                    style={{
                      backgroundColor: item?.bgColor,
                    }}
                  >
                    <div className="relative size-6">
                      <NextImg src={item?.icon} alt="contact icon" />
                    </div>
                  </a>
                </TooltipTrigger>

                <TooltipContent
                  side="right"
                  align="center"
                  className="rounded-md p-[6px_8px] text-sm text-white xl:text-base"
                  style={{
                    backgroundColor: item?.bgColor,
                  }}
                >
                  {item?.title}
                  <TooltipArrow style={{ fill: item?.bgColor }} />
                </TooltipContent>
              </TooltipRoot>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
