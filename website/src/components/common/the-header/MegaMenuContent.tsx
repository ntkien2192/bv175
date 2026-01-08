'use client';
import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import CustomLink from '../custom-link';

export default function MegaMenuContent({ item }: any) {
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <NavigationMenu.Content className="relative flex w-[calc(100vw*0.65)] gap-6 overflow-hidden p-[12px_16px] data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft 2xl:gap-7 2xl:p-[20px_24px] 3xl:gap-8 4xl:gap-10 4xl:p-[24px_32px]">
      <div className="flex-1">
        <div className="flex w-full items-stretch">
          {item?.sub_items?.map(
            (item_second: any, item_second_index: number) => (
              <div
                onClick={() => setCurrentTab(item_second_index)}
                key={item_second_index}
                className={`${currentTab === item_second_index ? 'border-primary-600 text-primary-600' : 'border-[#E4E4E7] text-[#71717A] hover:border-primary-300 hover:text-primary-400'} flex-1 cursor-pointer border-b-[2px] pb-3 text-center text-sm font-semibold uppercase transition-all duration-100 3xl:text-base`}
              >
                {item_second?.title || ''}
              </div>
            ),
          )}
        </div>

        {item?.sub_items?.map((item_second: any, item_second_index: number) => (
          <div
            key={item_second_index}
            className={`${currentTab === item_second_index ? 'grid' : 'hidden'} ${item_second?.sub_items?.length === 1 ? 'grid-cols-1' : 'grid-flow-row grid-cols-3 2xl:grid-cols-4'} gap-5 pt-4 2xl:gap-6 2xl:pt-5 3xl:gap-7 4xl:gap-8 4xl:pt-6`}
          >
            {item_second?.sub_items?.map(
              (item_third: any, item_third_index: number) => (
                <div
                  key={item_third_index}
                  className={`${item_third?.sub_items?.length >= 7 ? 'row-span-2' : ''}`}
                >
                  {item_third?.url &&
                  item_third?.title ? (
                    <CustomLink
                      href={item_third?.url || ''}
                      asNavigationLink
                      className="block text-sm font-bold uppercase text-black 3xl:text-base"
                    >
                      {item_third?.title || ''}
                    </CustomLink>
                  ) : (
                    <div className="block text-sm font-bold uppercase text-black 3xl:text-base">
                      {item_third?.title || ''}
                    </div>
                  )}

                  <div
                    className={`${item_second?.sub_items?.length === 1 ? 'grid grid-cols-3 gap-x-5 2xl:grid-cols-4 2xl:gap-x-6 3xl:gap-x-7 4xl:gap-x-8' : ''} pt-1`}
                  >
                    {item_third?.sub_items?.map(
                      (item_fourth: any, item_fourth_index: number) =>
                        item_fourth?.url ? (
                          <CustomLink
                            key={item_fourth_index}
                            href={item_fourth?.url || ''}
                            asNavigationLink
                            className="block py-[6px] text-sm font-medium text-[#010502] duration-100 hover:text-primary-600 3xl:py-[8px]"
                          >
                            {item_fourth?.title || ''}
                          </CustomLink>
                        ) : (
                          <div
                            key={item_fourth_index}
                            className="block py-[6px] text-sm font-medium text-[#010502] duration-100 hover:text-primary-600 3xl:py-[8px]"
                          >
                            {item_fourth?.title || ''}
                          </div>
                        ),
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </NavigationMenu.Content>
  );
}
