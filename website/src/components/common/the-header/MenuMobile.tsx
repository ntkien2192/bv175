'use client';

import React, { useRef, useState } from 'react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useScrollSmoother } from '@/src/providers/ScrollSmootherProvider';
import NextImg from '../next-img';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionRoot,
} from '../../ui/accordion';
import {
  Dialog,
  DialogContentMenuMobile,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '../../ui/dialog';
import { useMetadata } from '@/src/providers/MetadataProvider';
import { getAssetUrlById } from '@/src/utils/image';
import CustomLink from '../custom-link';
import LanguageBtn from './LanguageBtn';
import { cn } from '@/src/lib/utils';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';

type MobileMenuProps = {
  handleSearch: (key: string, value: string) => void;
};

export default function MobileMenu({ handleSearch }: MobileMenuProps) {
  const metadata = useMetadata();
  const contact_information = metadata?.contact_information;
  const top_navigation = metadata?.top_navigation;
  const t = useTranslations();

  const [isOpenSubMenu, setIsOpenSubMenu] = useState<boolean>(false);
  const [itemSecond, setItemSecond] = useState<any>();
  const [searchText, setSearchText] = useState<string>('');
  const { smoother } = useScrollSmoother();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => smoother?.paused(true)}
        asChild
        className="block"
      >
        <button className="flex items-center justify-center md:h-9 md:w-[52px] md:rounded-[6px] md:bg-primary-600 xl:hidden 2xl:h-10 2xl:w-[60px]">
          <div className="relative size-6 brightness-0 md:brightness-100 2xl:size-6">
            <NextImg src="/assets/icons/ham_menu.svg" alt="menu icon" />
          </div>
        </button>
      </DialogTrigger>

      <DialogContentMenuMobile onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="hidden">
          <DialogTitle>Mobile menu</DialogTitle>
          <DialogDescription>Mobile menu</DialogDescription>
        </div>

        <div className="container flex h-screen flex-col items-stretch overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between py-[6px]">
            {/* Logo 175 */}
            <DialogClose
              onClick={() => {
                setIsOpenSubMenu(false);
                smoother?.paused(false);
              }}
              asChild
              className="border-none outline-none"
            >
              <Link
                href={"/" as any}
                aria-label="Chuyển đến trang chủ"
                className="relative h-[40px] w-[230px] md:h-[46px] md:w-[274px] lg:h-[64px] lg:w-[382px] 2xl:h-[72px] 2xl:w-[430px] 4xl:h-[80px] 4xl:w-[478px]"
              >
                <NextImg
                  src="/assets/logo/long_primary_logo.svg"
                  alt="Military hospital logo"
                />
              </Link>
            </DialogClose>

            <div className="flex items-center gap-2">
              {/* Address button */}
              <CustomLink
                href={contact_information?.map_url}
                className="hidden md:flex"
              >
                <div className="btn-menu cursor-pointer">
                  <div className="relative size-5 2xl:size-6">
                    <NextImg
                      src="/assets/icons/map_pin.svg"
                      alt="hospital location"
                    />
                  </div>
                </div>
              </CustomLink>

              {/* Language button */}
              <LanguageBtn className="hidden md:flex" />

              {/* Close button */}
              <DialogClose
                ref={closeButtonRef}
                onClick={() => {
                  setIsOpenSubMenu(false);
                  smoother?.paused(false);
                }}
                asChild
                className="border-none outline-none"
              >
                <div className="btn-menu cursor-pointer">
                  <div className="relative size-5 2xl:size-6">
                    <NextImg src="/assets/icons/close.svg" alt="menu icon" />
                  </div>
                </div>
              </DialogClose>
            </div>
          </div>

          <div className="relative flex h-[calc(100vh-64px)] flex-col items-stretch">
            <div className="scrollbar-hidden relative flex-1 overflow-x-hidden overflow-y-scroll pb-[80px] md:pb-6">
              <div className="relative w-full space-y-5 md:space-y-7 lg:space-y-8">
                {/* Danh hiệu, huân chương */}
                <div className="flex items-center justify-center gap-6 pb-[6px] pt-5 md:hidden">
                  {contact_information?.files?.length > 0 &&
                    contact_information?.files?.map(
                      (file: any, index: number) => (
                        <CustomLink
                          href={t('Href.achievements')}
                          className="relative block h-[72px] w-[50px]"
                          key={index}
                        >
                          <NextImg
                            src={getAssetUrlById(file?.directus_files_id)}
                            alt="Military hospital"
                          />
                        </CustomLink>
                      ),
                    )}
                </div>

                {/* input search */}
                <div className="flex h-11 items-stretch gap-2 rounded-[6px] bg-[#F4F4F5] p-[6px_6px_6px_16px] backdrop-blur-[9.5px] md:gap-3 lg:gap-4">
                  <input
                    // tabIndex={1}
                    autoFocus={false}
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearch('s', searchText);
                        setSearchText('');
                        closeButtonRef.current?.click();
                      }
                    }}
                    className="flex-1 border-none bg-transparent text-base font-normal text-black outline-none placeholder:text-[#52525B]"
                    placeholder={t('Validate.search.placeholder')}
                  />
                  <button
                    onClick={() => {
                      handleSearch('s', searchText);
                      setSearchText('');
                      closeButtonRef.current?.click();
                    }}
                    className="flex items-center justify-center rounded-[4px] bg-primary-600 px-3"
                  >
                    <div className="relative size-5">
                      <NextImg
                        src="/assets/icons/search_white.svg"
                        alt="search icon"
                      />
                    </div>
                  </button>
                </div>

                {/* menu main */}
                <AccordionRoot
                  className="relative w-full divide-y-[1px] divide-gray-200"
                  type="single"
                  collapsible
                >
                  {top_navigation &&
                    top_navigation?.map((item: any, index: any) => {
                      return item?.sub_items ? (
                        <AccordionItem
                          value={`item-${index}`}
                          key={index}
                          className="group w-full"
                        >
                          <div className="flex w-full items-center justify-between gap-[2px]">
                            {item?.url ? (
                              <DialogClose
                                onClick={() => {
                                  smoother?.paused(false);
                                }}
                                asChild
                                className="border-none outline-none"
                              >
                                <CustomLink
                                  href={item?.url || ''}
                                  className="block py-5 text-sm font-bold uppercase text-black md:py-6"
                                >
                                  {item?.title || ''}
                                </CustomLink>
                              </DialogClose>
                            ) : (
                              <AccordionTrigger className="py-5 text-sm font-bold uppercase text-black md:py-6">
                                {item?.title || ''}
                              </AccordionTrigger>
                            )}

                            <AccordionTrigger className="relative flex size-6 origin-center items-center justify-center transition-all duration-300 ease-in group-data-[state=open]:-rotate-180">
                              <div className="relative size-5">
                                <NextImg
                                  src="/assets/icons/arrow_down_black.svg"
                                  alt="arrow down icon"
                                />
                              </div>
                            </AccordionTrigger>
                          </div>

                          <AccordionContent>
                            <div className="flex flex-col items-stretch divide-y-[1px] divide-gray-200 px-5 pb-3.5">
                              {item?.sub_items?.map(
                                (item_second: any, item_second_index: any) =>
                                  item_second?.sub_items?.length > 0 ? (
                                    <div
                                      key={item_second_index}
                                      className="flex w-full items-center justify-between gap-1"
                                    >
                                      <div className="flex cursor-pointer items-center gap-1">
                                        {item_second?.url ? (
                                          <DialogClose
                                            onClick={() =>
                                              smoother?.paused(false)
                                            }
                                            asChild
                                          >
                                            <CustomLink
                                              href={item_second?.url || ''}
                                              className="block py-4 text-sm font-medium text-[#18181B]"
                                            >
                                              {item_second?.title || ''}
                                            </CustomLink>
                                          </DialogClose>
                                        ) : (
                                          <div
                                            onClick={() => {
                                              setItemSecond(item_second);
                                              setIsOpenSubMenu(true);
                                            }}
                                            className="py-4 text-sm font-medium text-[#18181B]"
                                          >
                                            {item_second?.title || ''}
                                          </div>
                                        )}
                                        <div className="rounded-[20px] bg-primary-100 p-[2px_12px] text-sm font-medium text-primary-800">
                                          {item_second?.sub_items?.length === 1
                                            ? item_second?.sub_items?.[0]
                                                ?.sub_items?.length
                                            : item_second?.sub_items?.length}
                                        </div>
                                      </div>

                                      <div
                                        onClick={() => {
                                          setItemSecond(item_second);
                                          setIsOpenSubMenu(true);
                                        }}
                                        className="relative size-5 origin-center -rotate-90"
                                      >
                                        <NextImg
                                          src="/assets/icons/arrow_down_black.svg"
                                          alt="arrow down icon"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <DialogClose
                                      onClick={() => smoother?.paused(false)}
                                      asChild
                                      key={item_second_index}
                                      className="w-full"
                                    >
                                      <CustomLink
                                        href={item_second?.url || ''}
                                        className={cn(
                                          'block py-4 text-sm font-medium text-[#18181B]',
                                        )}
                                      >
                                        {item_second?.title || ''}
                                      </CustomLink>
                                    </DialogClose>
                                  ),
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <AccordionItem key={index}>
                          <DialogClose
                            onClick={() => smoother?.paused(false)}
                            asChild
                          >
                            <CustomLink
                              href={item?.url || ''}
                              className="block py-5 text-sm font-bold uppercase text-black md:py-6"
                            >
                              {item?.title || ''}
                            </CustomLink>
                          </DialogClose>
                        </AccordionItem>
                      );
                    })}
                </AccordionRoot>

                {/* footer */}
                <div className="flex items-center gap-2 md:hidden">
                  {/* address button */}

                  <CustomLink
                    href={contact_information?.map_url}
                    className="btn-menu"
                  >
                    <div className="relative size-5 2xl:size-6">
                      <NextImg
                        src="/assets/icons/map_pin.svg"
                        alt="hospital location"
                      />
                    </div>
                  </CustomLink>

                  {/* Language button */}
                  <LanguageBtn className="md:hidden" side="top" />
                </div>
              </div>
            </div>

            {/* sub menu: cấp 3 trở đi */}
            <div
              onScroll={(e) => e.stopPropagation()}
              className={`${isOpenSubMenu ? 'left-1/2 -translate-x-1/2 opacity-100' : 'left-0 translate-x-full opacity-0'} container absolute inset-0 z-[200] !m-0 flex h-full w-[100vw] flex-col items-stretch bg-white pt-5 transition-all duration-500 md:pt-6`}
            >
              <button
                onClick={() => setIsOpenSubMenu(false)}
                className="mb-2 flex items-center gap-1 md:mb-3"
              >
                <div className="relative size-5 origin-center rotate-90">
                  <NextImg
                    src="/assets/icons/arrow_down_black.svg"
                    alt="arrow down icon"
                  />
                </div>
                <div className="text-sm font-bold text-black">
                  {t('Common.return-main-menu')}
                </div>
              </button>

              <div className="scrollbar-hidden relative flex-1 overflow-x-hidden overflow-y-scroll py-5 pb-[130px]">
                <AccordionRoot
                  key={isOpenSubMenu ? 'open' : 'closed'}
                  className="relative w-full space-y-6"
                  type="multiple" // Cho phép nhiều tab mở cùng lúc
                  defaultValue={itemSecond?.sub_items?.map(
                    (_: any, i: number) => `item-second-${i}`,
                  )}
                >
                  {itemSecond &&
                    itemSecond?.sub_items?.map(
                      (item_third: any, item_third_index: any) => {
                        return item_third?.sub_items ? (
                          <AccordionItem
                            value={`item-second-${item_third_index}`}
                            key={item_third_index}
                            className="group w-full"
                          >
                            {item_third?.title && (
                              <div className="flex w-full items-center justify-between gap-[2px]">
                                {item_third?.url ? (
                                  <DialogClose
                                    onClick={() => {
                                      setIsOpenSubMenu(false);
                                      smoother?.paused(false);
                                    }}
                                    asChild
                                    className="border-none outline-none"
                                  >
                                    <CustomLink
                                      href={item_third?.url || ''}
                                      className="text-start text-sm font-bold uppercase text-black"
                                    >
                                      {item_third?.title || ''}
                                    </CustomLink>
                                  </DialogClose>
                                ) : (
                                  <AccordionTrigger className="text-start text-sm font-bold uppercase text-black">
                                    {item_third?.title || ''}
                                  </AccordionTrigger>
                                )}

                                <AccordionTrigger className="relative size-5 origin-center transition-all duration-300 ease-in group-data-[state=open]:-rotate-180">
                                  <NextImg
                                    src="/assets/icons/arrow_down_black.svg"
                                    alt="arrow down icon"
                                  />
                                </AccordionTrigger>
                              </div>
                            )}

                            <AccordionContent>
                              <div
                                className={`${item_third?.title ? 'pt-4' : 'pt-0'} flex flex-col gap-4 px-5`}
                              >
                                {item_third?.sub_items?.map(
                                  (item_fourth: any, item_fourth_index: any) =>
                                    item_fourth?.sub_items?.length > 0 ? (
                                      <div
                                        key={item_fourth_index}
                                        className="flex w-fit cursor-pointer items-center gap-1"
                                      >
                                        <div className="text-sm font-medium text-[#18181B]">
                                          {item_fourth?.title || ''}
                                        </div>
                                        <div className="rounded-[20px] bg-primary-100 p-[2px_12px] text-sm font-medium text-primary-800">
                                          {item_fourth?.sub_items?.length}
                                        </div>
                                        <div className="relative size-5 origin-center -rotate-90">
                                          <NextImg
                                            src="/assets/icons/arrow_down_black.svg"
                                            alt="arrow down icon"
                                          />
                                        </div>
                                      </div>
                                    ) : (
                                      <DialogClose
                                        onClick={() => {
                                          setIsOpenSubMenu(false);
                                          smoother?.paused(false);
                                        }}
                                        asChild
                                        key={item_fourth_index}
                                        className="w-fit"
                                      >
                                        <CustomLink
                                          href={item_fourth?.url || ''}
                                          className="text-sm font-medium text-[#18181B]"
                                        >
                                          {item_fourth?.title || ''}
                                        </CustomLink>
                                      </DialogClose>
                                    ),
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <AccordionItem key={item_third_index}>
                            <DialogClose
                              onClick={() => {
                                setIsOpenSubMenu(false);
                                smoother?.paused(false);
                              }}
                              asChild
                            >
                              <CustomLink
                                href={item_third?.url || ''}
                                className="text-sm font-bold uppercase text-black"
                              >
                                {item_third?.title || ''}
                              </CustomLink>
                            </DialogClose>
                          </AccordionItem>
                        );
                      },
                    )}
                </AccordionRoot>
              </div>
            </div>
          </div>
        </div>
      </DialogContentMenuMobile>
    </Dialog>
  );
}
