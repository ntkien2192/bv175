'use client';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useRef, useState } from 'react';
import NextImg from '../next-img';
import { useMetadata } from '@/src/providers/MetadataProvider';
import MegaMenuContent from './MegaMenuContent';
import CustomLink from '../custom-link';

export default function NavHeader() {
  const metadata = useMetadata();
  const top_navigation = metadata?.top_navigation;

  const [leftPosition, setLeftPosition] = useState(0);
  const [isSubMenuOverflow, setIsSubMenuOverflow] = useState<boolean>(false);

  const menuItemsRef = useRef<(HTMLElement | null)[]>([]);

  const handleMouseEnter = (index: number, isMegaMenu: boolean) => {
    const item = menuItemsRef.current[index];
    if (item) {
      if (isMegaMenu) {
        const rect = item.getBoundingClientRect();
        const megaMenuWidth = window.innerWidth * 0.65;
        if (rect.left < window.innerWidth * 0.3) {
          setLeftPosition(rect.left);
        } else if (window.innerWidth - rect.right < window.innerWidth * 0.3) {
          setLeftPosition(rect.right - megaMenuWidth);
        } else {
          setLeftPosition(rect.left - megaMenuWidth / 2 + rect.width / 2);
        }
      } else {
        const rect = item.getBoundingClientRect();
        setLeftPosition(rect.left);
      }
    }
  };

  return (
    <NavigationMenu.Root className="relative w-full bg-primary-600 shadow-md">
      <NavigationMenu.List className="container flex justify-center gap-5 2xl:gap-6 3xl:gap-8 4xl:gap-10">
        {top_navigation?.length > 0 &&
          top_navigation?.map((item: any, index: any) => {
            return item?.sub_items ? (
              <NavigationMenu.Item key={index}>
                <NavigationMenu.Trigger
                  className="group relative select-none"
                  onMouseEnter={(e) =>
                    handleMouseEnter(index, item?.type === 'mega_menu')
                  }
                >
                  {item?.url ? (
                    <CustomLink
                      href={item?.url || ''}
                      ref={(el: any) => {
                        menuItemsRef.current[index] = el;
                      }}
                      asNavigationLink
                      className="relative flex items-center gap-[2px] whitespace-nowrap text-nowrap py-3 text-sm font-bold uppercase text-white 3xl:gap-1 3xl:text-base"
                    >
                      {item?.title || ''}
                      <div className="relative size-5 origin-center duration-200 group-data-[state=open]:-rotate-180 3xl:size-6">
                        <NextImg
                          src="/assets/icons/arrow_down_white.svg"
                          alt="arrow down icon"
                        />
                      </div>
                    </CustomLink>
                  ) : (
                    <div
                      ref={(el: any) => {
                        menuItemsRef.current[index] = el;
                      }}
                      className="relative flex items-center gap-[2px] whitespace-nowrap text-nowrap py-3 text-sm font-bold uppercase text-white 3xl:gap-1 3xl:text-base"
                    >
                      {item?.title}
                      <div className="relative size-5 origin-center duration-200 group-data-[state=open]:-rotate-180 3xl:size-6">
                        <NextImg
                          src="/assets/icons/arrow_down_white.svg"
                          alt="arrow down icon"
                        />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 hidden h-[8px] w-full translate-y-full cursor-default group-data-[state=open]:block 2xl:h-[10px]"></div>
                </NavigationMenu.Trigger>

                {item?.type === 'mega_menu' ? (
                  <MegaMenuContent item={item} />
                ) : (
                  <NavigationMenu.Content className="group/nav relative w-fit min-w-[160px] py-2">
                    {item?.sub_items?.map(
                      (item_second: any, item_second_index: any) => (
                        <div
                          onMouseEnter={() => setIsSubMenuOverflow(true)}
                          onMouseLeave={() => setIsSubMenuOverflow(false)}
                          key={item_second_index}
                          className="group group-data-[motion=from-end]/nav:animate-enterFromRight group-data-[motion=from-start]/nav:animate-enterFromLeft group-data-[motion=to-end]/nav:animate-exitToRight group-data-[motion=to-start]/nav:animate-exitToLeft"
                        >
                          {/* Cấp 1 */}
                          {item_second?.url ? (
                            <CustomLink
                              href={item_second?.url || ''}
                              asNavigationLink
                              className="flex items-center gap-2 whitespace-nowrap text-nowrap p-[6px_12px] text-sm font-medium text-black transition-all duration-100 group-hover:text-primary-600 2xl:p-[6px_12px] 3xl:p-[8px_16px]"
                            >
                              <div className="flex-1">
                                {item_second?.title || ''}
                              </div>
                              {item_second?.sub_items?.length > 0 && (
                                <div className="relative size-5 brightness-0 transition-all duration-200 group-hover:-rotate-90 group-hover:brightness-100">
                                  <NextImg
                                    src="/assets/icons/arrow_down_primary.svg"
                                    alt="arrow icon"
                                  />
                                </div>
                              )}
                            </CustomLink>
                          ) : (
                            <div className="flex items-center gap-2 whitespace-nowrap text-nowrap p-[6px_12px] text-sm font-medium text-black transition-all duration-100 group-hover:text-primary-600 2xl:p-[6px_12px] 3xl:p-[8px_16px]">
                              <div className="flex-1">
                                {item_second?.title || ''}
                              </div>
                              {item_second?.sub_items?.length > 0 && (
                                <div className="relative size-5 brightness-0 transition-all duration-200 group-hover:-rotate-90 group-hover:brightness-100">
                                  <NextImg
                                    src="/assets/icons/arrow_down_primary.svg"
                                    alt="arrow icon"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {/* Cấp 2 */}
                          {item_second?.sub_items?.length > 0 && (
                            <div
                              className="pointer-events-none absolute left-[calc(100%+8px)] translate-y-[-8px] flex w-fit scale-95 grid-cols-3 gap-4 rounded-[6px] bg-white p-3 opacity-0 shadow-lg transition-all duration-200 after:absolute after:-left-2 after:top-0 after:h-full after:w-2 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 3xl:gap-6 3xl:p-4"
                              style={{
                                boxShadow:
                                  '0 20px 25px -4px rgba(18, 26, 43, 0.10), 0 8px 8px -6px rgba(18, 26, 43, 0.04)',
                                top: `calc(100%/${item?.sub_items?.length}*${item_second_index})`,
                              }}
                            >
                              {item_second?.sub_items.map(
                                (item_third: any, item_third_index: number) => (
                                  <div
                                    key={item_third_index}
                                    className={`w-[200px] 3xl:w-[230px]`}
                                  >
                                    {item_third?.url ? (
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

                                    <div className="pt-1">
                                      {item_third?.sub_items?.map(
                                        (
                                          item_fourth: any,
                                          item_fourth_index: number,
                                        ) =>
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
                          )}
                        </div>
                      ),
                    )}
                  </NavigationMenu.Content>
                )}
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item key={index}>
                <CustomLink
                  href={item?.url || ''}
                  asNavigationLink
                  className="relative block whitespace-nowrap text-nowrap py-3 text-sm font-bold uppercase text-white 3xl:text-base"
                >
                  {item?.title || ''}
                </CustomLink>
              </NavigationMenu.Item>
            );
          })}
      </NavigationMenu.List>
      <div
        className="perspective-[2000px] absolute left-0 top-[50px] w-full transition-all duration-300 2xl:top-[54px] 3xl:top-[58px]"
        style={{ left: `${leftPosition}px` }}
      >
        <NavigationMenu.Viewport
          className={`${isSubMenuOverflow ? 'overflow-visible' : 'overflow-hidden'} relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-[top_center] rounded-[6px] bg-white shadow-[0_20px_25px_-4px_rgba(18,26,43,0.1)] transition-all duration-100 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn`}
        />
      </div>
    </NavigationMenu.Root>
  );
}
