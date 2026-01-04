'use client';
import NextImg from '@/src/components/common/next-img';
import { Link } from '@/src/i18n/navigation';
import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';
import { getAllDepartmentGroups } from '@/src/services/department';
import { CommonSection } from '@/src/types/pageBuilder';
import { handleScrollTo, handleScrollToDepartmentPage } from '@/src/utils/gsap';
import { getAssetUrlById } from '@/src/utils/image';
import { removeVietnameseMarks } from '@/src/utils/validate';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollToPlugin, ScrollTrigger);

const DepartmentDetailPage = ({
  // departmentGroups,
  // parentGroups,
  data,
}: CommonSection) => {
  const containerRef = useRef<any>(null);
  const sidebarRef = useRef<any>(null);
  const { conditions } = useGsapMatchMedia();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [parentGroups, setParentGroups] = useState<any[]>([]);

  const keyword = searchParams.get('s') || '';

  const [searchText, setSearchText] = useState<string>(keyword);
  const ctaButtonData = data?.buttons[0];
  const [filteredGroups, setFilteredGroups] = useState(parentGroups);
  const normalizeText = (str: string) =>
    removeVietnameseMarks(str || '').toLowerCase();

  // const { contextSafe } = useGSAP(
  //   () => {
  //     if (!containerRef.current || !sidebarRef.current || !conditions) return;
  //     const mm = gsap.matchMedia();
  //     mm.add('(max-width: 767px)', () => {
  //       ScrollTrigger.create({
  //         trigger: sidebarRef.current,
  //         start: () => getPositionFixed(conditions),
  //         endTrigger: containerRef.current,
  //         // end: "bottom bottom",
  //         end: () =>
  //           `+=${containerRef?.current?.offsetHeight - sidebarRef?.current?.offsetHeight}`,
  //         pin: true,
  //         pinSpacing: false,
  //         pinnedContainer: containerRef?.current,
  //       });
  //     });

  //     mm.add('(min-width: 1600px)', () => {
  //       ScrollTrigger.create({
  //         trigger: sidebarRef.current,
  //         start: () => getPositionFixed(conditions),
  //         endTrigger: containerRef.current,
  //         // end: "bottom bottom",
  //         // end: () => `bottom bottom+=${containerRef.current?.offsetHeight || 0}`,
  //         end: () =>
  //           `+=${containerRef?.current?.offsetHeight - sidebarRef?.current?.offsetHeight}`,
  //         pin: true,
  //         pinSpacing: false,
  //         pinnedContainer: containerRef?.current,
  //       });
  //     });
  //   },
  //   {
  //     scope: containerRef,
  //     dependencies: [conditions],
  //   },
  // );

  useEffect(() => {
    async function fetchGroups() {
      try {
        const groups = await getAllDepartmentGroups();
        setParentGroups(
          groups?.filter((d: any) => d.parent_group === null) || [],
        );
      } catch (err) {
        console.error('Failed to load department groups:', err);
        setParentGroups([]);
      }
    }
    fetchGroups();
  }, []);

  const filterRecursive = (group: any, text: string) => {
    const newGroup: any = { ...group };

    // 1) Filter departments
    if (newGroup.departments) {
      newGroup.departments = newGroup.departments.filter((d: any) => {
        const title = normalizeText(d.title);
        const code = normalizeText(d.code);
        return title.includes(text) || code.includes(text);
      });
    }

    // 2) Filter department_groups (nested)
    if (newGroup.children_groups) {
      newGroup.children_groups = newGroup.children_groups
        .map((g: any) => filterRecursive(g, text))
        .filter((g: any) => {
          const hasDepts = g.departments && g.departments.length > 0;
          const hasChildren = g.children_groups && g.children_groups.length > 0;
          return hasDepts || hasChildren;
        });
    }

    return newGroup;
  };

  const handleSearch = useCallback(
    (searchText: string) => {
      const params = new URLSearchParams(searchParams);
      if (searchText && searchText.trim() !== '') {
        params.set('s', searchText.trim());
      } else {
        params.delete('s');
      }
      router.push(`?${params.toString()}`, { scroll: false });
      handleScrollTo('department-list', conditions);
    },
    [router, searchParams, conditions],
  );

  useEffect(() => {
    if (parentGroups?.length === 0) return;

    if (!searchText.trim()) {
      setFilteredGroups(parentGroups);
      return;
    }

    const text = normalizeText(searchText);

    const newGroups = parentGroups
      .map((pGroup: any) => filterRecursive(pGroup, text))
      .filter((g: any) => {
        const hasDepts = g.departments && g.departments.length > 0;
        const hasChildren =
          (g.children_groups && g.children_groups.length > 0) ||
          (g.department_groups && g.department_groups.length > 0);
        return hasDepts || hasChildren;
      });

    setFilteredGroups(newGroups);
  }, [keyword, parentGroups]);

  return (
    <div className="bg-primary-50">
      {/* Banner + Search box */}
      <div className="md:relative">
        <div
          className="flex h-full flex-col items-center gap-1 py-40 text-center md:py-[100px] lg:gap-2 lg:py-[120px] 2xl:gap-4 2xl:py-[140px] 3xl:py-40"
          style={{
            background: ` linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url("${getAssetUrlById(data?.cover?.id)}") lightgray 50% / cover no-repeat`,
          }}
        >
          {/* title */}
          {data?.title && (
            <h1 className="text-[28px] font-bold text-white md:text-[40px] lg:text-[44px] 2xl:text-[48px] 3xl:text-[60px] 4xl:text-[72px]">
              {data?.title}
            </h1>
          )}
          {/* subtitle */}
          <p className="text-base font-normal text-gray-200 md:text-lg lg:text-xl">
            {data?.subtitle}
          </p>
        </div>

        {/* Search form */}
        <div className="mx-auto hidden w-full bg-transparent md:bottom-0 md:left-1/2 md:max-w-[600px] md:-translate-x-1/2 md:translate-y-1/2 md:bg-transparent md:px-0 md:py-0 lg:max-w-[800px] 3xl:absolute 3xl:block">
          <form
            className="flex items-center justify-between rounded-[6px] bg-white px-3 py-2 shadow-md 3xl:p-6"
            onSubmit={(e: any) => {
              e.preventDefault();
              handleSearch(searchText);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(searchText);
              }
            }}
          >
            <div className="flex flex-1 flex-col text-start">
              <label
                htmlFor="searchText"
                className="text-sm font-normal text-gray-500"
              >
                {data?.blurb}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch(searchText);
                  }
                }}
                placeholder={data?.contents}
                className="text-base font-normal placeholder:text-[#0F2F64] focus:border-none focus:outline-none md:text-lg"
              />
            </div>
            <button
              type="submit"
              className="flex size-10 items-center justify-center rounded-[4px] bg-primary-600 p-3 text-white md:size-auto md:gap-4 3xl:px-8 3xl:py-4"
            >
              <span className="hidden md:block">Tìm kiếm</span>
              <img
                src="/assets/icons/arrow_right_white.svg"
                alt="arrow right"
              />
            </button>
          </form>
        </div>
      </div>

      {/* Slider các khối */}
      <div className="container hidden flex-wrap justify-center gap-6 3xl:flex 3xl:max-w-[1280px] 3xl:px-0 3xl:pt-[100px] 4xl:max-w-[1440px]">
        {parentGroups?.map((group: any, index: number) => (
          <DepartmentSlideCard group={group} key={'item_' + index} />
        ))}
      </div>

      <div
        id="department-list"
        className="p-[12px_0_24px] xl:p-[20px_0_40px] 2xl:p-[60px_0_48px] 4xl:p-[64_0_120px]"
      >
        <div
          ref={containerRef}
          className="flex flex-col items-stretch md:container md:gap-6 lg:gap-6 2xl:gap-0 3xl:flex-row 3xl:items-start 3xl:gap-[72px] 4xl:gap-20"
        >
          <div
            ref={sidebarRef}
            className="sticky top-[64px] block h-fit md:static md:pt-3 xl:pt-5 3xl:sticky 3xl:top-[160px] 3xl:pt-6 4xl:top-[160px] 4xl:pt-[40px]"
          >
            <div className="h-fit rounded-[16px] border border-[#E9EBED] bg-white p-4 lg:p-5 2xl:p-6 3xl:w-[360px] 3xl:p-[24px_20px]">
              {/* input */}
              <form
                className="relative block rounded-[6px] bg-gray-100 p-2 !pl-11 shadow-lg md:p-3 2xl:p-4"
                onSubmit={(e: any) => {
                  e.preventDefault();
                  handleSearch(searchText);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch(searchText);
                  }
                }}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full bg-transparent bg-none text-base text-gray-950 placeholder:text-gray-500 focus:border-none focus:outline-none xl:text-lg"
                  placeholder="Tìm kiếm theo tên, mã "
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch(searchText);
                    }
                  }}
                />
                <img
                  onClick={() => handleSearch(searchText)}
                  src="/assets/icons/search_gray.svg"
                  alt="search_gray"
                  className="absolute left-4 top-1/2 size-5 -translate-y-1/2 cursor-pointer"
                />
              </form>

              {/* Button cac khoi */}
              <div className="mt-2 flex gap-2 md:mt-4 md:gap-4 3xl:h-fit 3xl:flex-col">
                {parentGroups?.slice(0, 3)?.map((group: any, index: number) => {
                  return (
                    <div
                      onClick={() =>
                        handleScrollToDepartmentPage(group?.slug, conditions)
                      }
                      key={'group_' + index}
                      className={clsx(
                        'group relative flex flex-1 cursor-pointer items-center justify-center gap-2.5 overflow-hidden px-[18px] py-3 shadow-lg transition-all hover:bg-primary-600 md:px-5 md:py-4 lg:gap-3 xl:w-fit xl:flex-1 3xl:w-full 3xl:justify-start',
                      )}
                    >
                      <img
                        src={getAssetUrlById(group.icon)}
                        alt="icon"
                        className="size-5 group-hover:brightness-0 group-hover:invert md:size-8 lg:size-9 xl:size-10"
                      />
                      <div className="text-nowrap text-sm font-semibold text-gray-500 group-hover:text-white md:text-base lg:text-lg">
                        {group.title}
                      </div>
                      <BgHiddenShape className="pointer-events-none absolute left-1/2 w-[90%] -translate-x-[60%]" />
                    </div>
                  );
                })}
              </div>

              {/* CTA goi ngay */}
              <div className="relative mt-4 hidden rounded-[6px] bg-primary-950 px-6 py-8 3xl:block">
                <div className="relative z-10">
                  <div
                    className="mb-5 text-[28px] font-bold text-primary-50"
                    dangerouslySetInnerHTML={{
                      __html: ctaButtonData?.title,
                    }}
                  ></div>
                  <Link
                    href={ctaButtonData?.url}
                    className="flex w-fit items-center gap-2.5 rounded-[6px] bg-[#E50000] p-[10px_12px_10px_16px] text-lg font-medium leading-none text-white"
                  >
                    {ctaButtonData?.blurb}
                    <img
                      src="/assets/icons/phone_white.svg"
                      alt="phone"
                      className="size-5"
                    />
                  </Link>
                </div>
                <img
                  src="/assets/images/net-overlay.png"
                  alt="net overlay"
                  className="absolute inset-0 z-0 opacity-30"
                />
              </div>
            </div>
          </div>

          {/* Các khối */}
          <div className="flex flex-1 flex-col px-6 md:px-0 2xl:pt-6 4xl:pt-[40px]">
            {filteredGroups?.map((pGroup: any, index: number) => {
              return <DepartmentGroupSection pGroup={pGroup} key={index} />;
            })}
          </div>
        </div>
      </div>

      {/* Danh sách khoa */}

      {/* Đối tác bảo hiểm */}
    </div>
  );
};

export default DepartmentDetailPage;

const DepartmentGroupSection = ({ pGroup }: { pGroup: any }) => {
  return (
    <div
      className="py-6 lg:py-8 xl:py-10 2xl:py-12 3xl:py-[52px]"
      id={pGroup.slug}
    >
      {/* <p className="section-sub-title">{pGroup.description}</p> */}
      <p className="section-title mt-2">{pGroup.title}</p>

      {/* List các khối con */}
      {pGroup?.children_groups && pGroup.children_groups.length > 0 && (
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4 xl:mt-8 xl:gap-5 2xl:gap-6 3xl:mt-[32px]">
          {pGroup.children_groups.map((group: any, idx: number) => (
            <div
              key={'group___' + idx}
              className={clsx(
                'w-full cursor-pointer text-base font-normal text-gray-950 hover:text-primary-600 md:w-[calc(50%-12px)] lg:text-lg 2xl:text-xl',
              )}
            >
              {pGroup?.slug === 'chuyen-khoa' ? (
                <div
                  className={clsx(
                    'cursor-default p-[8px_0__4px] text-base font-semibold text-gray-950 underline-offset-4 hover:text-primary-600 md:p-[12px_0__4px] lg:p-[16px_0_4px] lg:text-lg 2xl:text-xl',
                  )}
                >
                  {group.title} {group.code ? `(${group.code})` : null}
                </div>
              ) : (
                <Link
                  href={`/${pGroup?.slug}/${group?.slug}`}
                  className={clsx(
                    'cursor-pointer p-[8px_0__4px] text-base font-semibold text-gray-950 underline-offset-4 hover:text-primary-600 hover:underline md:p-[12px_0__4px] lg:p-[16px_0_4px] lg:text-lg 2xl:text-xl',
                  )}
                >
                  {group.title} {group.code ? `(${group.code})` : null}
                </Link>
              )}

              <div className="ml-3 mt-4 flex list-none flex-col gap-4 md:ml-5 md:gap-5 xl:ml-7 xl:mt-5 2xl:gap-6 3xl:gap-x-4 3xl:gap-y-5">
                {group.departments.map((department: any, idx: number) => (
                  <Link
                    href={'/chuyen-khoa/' + department.slug}
                    className={clsx(
                      'text-base font-normal text-gray-950 hover:text-primary-600 hover:underline lg:text-lg 2xl:text-xl',
                    )}
                    key={'department_' + idx}
                    aria-label="Xem chi tiết chuyên khoa"
                  >
                    {department.title}{' '}
                    {department.code ? `(${department.code})` : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Các khoa */}
      {pGroup?.departments && pGroup.departments.length > 0 && (
        <div className="mt-5 flex list-none flex-col gap-3 md:flex-row md:flex-wrap md:gap-4 xl:mt-8 xl:gap-5 2xl:gap-6 3xl:mt-[32px] 3xl:gap-x-4 3xl:gap-y-5">
          {pGroup.departments.map((department: any, idx: number) => (
            <Link
              href={'/chuyen-khoa/' + department.slug}
              className={clsx(
                'text-base font-normal text-gray-950 underline-offset-4 hover:text-primary-600 hover:underline lg:w-[calc(50%-12px)] lg:text-lg 2xl:text-xl',
              )}
              key={'department_' + idx}
              aria-label="Xem chi tiết chuyên khoa"
            >
              {department.title}{' '}
              {department.code ? `(${department.code})` : null}
            </Link>
          ))}
        </div>
      )}

      {/* Các khoa thuộc khối con */}
    </div>
  );
};

const DepartmentSlideCard = ({ group }: { group: any }) => {
  const { conditions } = useGsapMatchMedia();
  return (
    <button
      onClick={() => handleScrollToDepartmentPage(group?.slug, conditions)}
      className="group relative cursor-pointer space-y-5 bg-white p-5 shadow-lg transition-all hover:bg-primary-600 lg:w-[calc((100%-24px*2)/3)]"
    >
      {/* cover */}
      <div className="relative aspect-video w-full">
        <NextImg
          src={getAssetUrlById(group.cover)}
          alt="cover"
          objectFit="cover"
        />
      </div>

      {/* title + desc */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <img
            src={getAssetUrlById(group.icon)}
            alt="logo_khoi_noi"
            className="size-7 group-hover:brightness-0 group-hover:invert 3xl:size-12"
          />
          <h4 className="text-xl font-semibold text-gray-500 group-hover:text-white">
            {group.title}
          </h4>
        </div>
        {/* <p className="text-sm font-medium text-gray-500 group-hover:text-white">
          {group.description}
        </p> */}
      </div>

      {/* view details */}
      <div className="flex items-center gap-2 font-medium text-gray-500 group-hover:text-primary-50 3xl:text-lg">
        Xem chi tiết
        <img
          src="/assets/icons/arrow_right_gray.svg"
          alt="arrow right"
          className="size-6 group-hover:brightness-0 group-hover:invert"
        />
      </div>
      <BgHiddenShape className="pointer-events-none absolute left-0 w-[90%]" />
    </button>
  );
};

const BgHiddenShape = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 273 136"
    fill="none"
  >
    <path
      opacity="0.05"
      d="M22.1612 0L249.474 0L272.268 67.2283L250.301 136H22.7936L0 68.7717L22.1612 0Z"
      fill="url(#paint0_linear_473_8867)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_473_8867"
        x1="148.511"
        y1="12.4313"
        x2="17.9858"
        y2="31.515"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#07A438" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
