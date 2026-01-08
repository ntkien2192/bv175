'use client';
import NextImg from '@/src/components/common/next-img';
import ThePagination from '@/src/components/common/the-pagination';
import { getDoctorsCount, getListDoctors } from '@/src/services/doctors';
import { getAssetUrlById } from '@/src/utils/image';
import { getDoctorTitles } from '@/src/utils/render-doctor-title';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGsapMatchMedia } from '@/src/providers/GsapMatchMediaProvider';
import { handleScrollTo } from '@/src/utils/gsap';
import { CommonSection } from '@/src/types/pageBuilder';
import { getAllDepartmentGroups } from '@/src/services/department';
import CustomLink from '@/src/components/common/custom-link';

const DoctorList = ({ data }: CommonSection) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { conditions } = useGsapMatchMedia();

  const [departmentGroups, setDepartmentGroups] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDepartmentGroups() {
      try {
        const res = await getAllDepartmentGroups();
        setDepartmentGroups(res || []);
      } catch (err) {
        console.error('Failed to load department groups:', err);
        setDepartmentGroups([]);
      }
    }
    fetchDepartmentGroups();
  }, []);

  // Đọc query params
  const searchText = searchParams.get('q') || '';
  const selectedLetter = searchParams.get('letter') || '';
  const departmentSlug = searchParams.get('department') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchByName = searchParams.get('searchByName') === 'true';
  const searchByDepartment = searchParams.get('searchByDepartment') === 'true';

  // UI state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const parentGroups = useMemo(
    () => departmentGroups?.filter((d: any) => d.parent_group === null),
    [departmentGroups],
  );

  const selectedDepartment = useMemo(() => {
    if (!departmentSlug) return null;

    for (const group of departmentGroups) {
      const dept = group.departments?.find(
        (d: any) => d.slug === departmentSlug,
      );
      if (dept) return dept;

      if (group.children_groups) {
        for (const childGroup of group.children_groups) {
          const dept = childGroup.departments?.find(
            (d: any) => d.slug === departmentSlug,
          );
          if (dept) return dept;
        }
      }
    }
    return null;
  }, [departmentSlug, departmentGroups]);

  const [activeParentGroup, setActiveParentGroup] = useState(
    selectedDepartment
      ? departmentGroups.find(
          (g: any) =>
            g.departments?.some((d: any) => d.slug === departmentSlug) ||
            g.children_groups?.some((cg: any) =>
              cg.departments?.some((d: any) => d.slug === departmentSlug),
            ),
        )?.slug
      : null,
  );

  const currentParentGroup = useMemo(() => {
    return departmentGroups.find((d: any) => d.slug === activeParentGroup);
  }, [activeParentGroup, departmentGroups]);

  const panelRef = useRef<HTMLFormElement>(null);

  // Fetching state
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  // Hàm update query params
  const updateQueryParams = (params: Record<string, string | null>) => {
    const current = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    const query = current.toString();
    router.push(query ? `?${query}` : window.location.pathname, {
      scroll: false,
    });
    handleScrollTo('search_results', conditions);
  };

  const resetFilter = () => {
    router.push(window.location.pathname, { scroll: false });
  };

  // Thay đổi logic toggle để tự động tắt filter còn lại
  const toggleSearchByName = () => {
    if (!searchByName) {
      // Khi bật search by name, tắt search by department
      updateQueryParams({
        searchByName: 'true',
        searchByDepartment: null,
        department: null,
        letter: null,
        page: '1',
      });
    } else {
      // Khi tắt search by name
      updateQueryParams({
        searchByName: null,
        letter: null,
        page: '1',
      });
    }
  };

  const toggleSearchByDepartment = () => {
    if (!searchByDepartment) {
      // Khi bật search by department, tắt search by name
      updateQueryParams({
        searchByDepartment: 'true',
        searchByName: null,
        letter: null,
        department: null,
        page: '1',
      });
    } else {
      // Khi tắt search by department
      updateQueryParams({
        searchByDepartment: null,
        department: null,
        page: '1',
      });
    }
  };

  // Thêm logic kiểm tra khi chọn chữ cái
  const setSelectedLetter = (letter: string) => {
    updateQueryParams({
      letter,
      searchByDepartment: null,
      department: null,
      page: '1',
    });
  };

  // Thêm logic kiểm tra khi chọn chuyên khoa
  const setSelectedDepartmentBySlug = (slug: string) => {
    updateQueryParams({
      department: slug,
      searchByName: null,
      letter: null,
      page: '1',
    });
  };

  const setPage = (page: number) => {
    updateQueryParams({
      page: page.toString(),
    });
  };

  // Click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // // Sync input with query
  // useEffect(() => {
  //   setInputValue(searchText);
  // }, [searchText]);

  // Fetch doctors
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getListDoctors({
        limit: 6,
        page: currentPage,
        keyword: searchText || undefined,
        letter: searchByName && selectedLetter ? selectedLetter : undefined,
        departmentId:
          searchByDepartment && departmentSlug ? departmentSlug : undefined,
      });
      setDoctors(res || []);
    } catch (err) {
      console.error(err);
      setDoctors([]);
      setTotalPage(1);
    } finally {
      setLoading(false);
      ScrollTrigger.refresh();
    }
  }, [
    selectedLetter,
    departmentSlug,
    searchByName,
    searchByDepartment,
    searchText,
    currentPage,
  ]);

  const fetchDoctorCount = useCallback(async () => {
    try {
      const res = await getDoctorsCount({
        keyword: searchText || undefined,
        letter: searchByName && selectedLetter ? selectedLetter : undefined,
        departmentId:
          searchByDepartment && departmentSlug ? departmentSlug : undefined,
      });
      setTotalItem(res);
      setTotalPage(Math.ceil(res / 6));
    } catch (err) {
      console.error(err);
      setDoctors([]);
      setTotalPage(1);
      ScrollTrigger.refresh();
    }
  }, [
    selectedLetter,
    departmentSlug,
    searchByName,
    searchByDepartment,
    searchText,
  ]);

  useEffect(() => {
    fetchDoctorCount();
    fetchDoctors();
  }, [fetchDoctorCount, fetchDoctors]);

  return (
    <section className="bg-primary-50">
      {/* Banner + Search box */}

      {/* Danh sách bác sĩ */}
      <div className="container space-y-8 pb-20 md:space-y-10 lg:pb-16 xl:pb-[72px] 2xl:pb-20 3xl:pb-[100px] 4xl:pb-[120px]">
        {/* Nút chuyển tabs */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {/* Tim theo ten */}
          <div
            className={clsx(
              'relative flex h-[100px] w-full cursor-pointer flex-col justify-center px-5 py-4 shadow-lg md:h-[120px] md:flex-1 lg:h-[140px] xl:h-[160px]',
              searchByName ? 'bg-primary-600 *:!text-gray-50' : 'bg-white',
            )}
            onClick={toggleSearchByName}
          >
            <div className="mb-2 flex items-center gap-2.5 text-lg font-semibold text-gray-500 lg:text-xl">
              <div className="flex items-center justify-center rounded-[6px] bg-primary-50 p-2">
                <img
                  src={'/assets/icons/search_by_name.svg'}
                  alt="search by name"
                  className="size-5"
                />
              </div>
              Lọc theo Tên
            </div>
            <p className="text-sm font-medium text-gray-500 3xl:text-base">
              Tìm nhanh bác sĩ theo tên
            </p>
            <img
              src="/assets/images/arrow_bg.png"
              alt="bg"
              className={clsx(
                'absolute right-[20%] top-1/2 -translate-y-1/2',
                searchByName ? 'block' : 'hidden',
              )}
            />
          </div>

          {/* Tim theo khoa */}
          <div
            className={clsx(
              'relative flex h-[100px] w-full cursor-pointer flex-col justify-center px-5 py-4 shadow-lg md:h-[120px] md:flex-1 lg:h-[140px] xl:h-[160px]',
              searchByDepartment
                ? 'bg-primary-600 *:!text-gray-50'
                : 'bg-white',
            )}
            onClick={toggleSearchByDepartment}
          >
            <div className="mb-2 flex items-center gap-2.5 text-lg font-semibold text-gray-500 lg:text-xl">
              <div className="flex items-center justify-center rounded-[6px] bg-primary-50 p-2">
                <img
                  src={'/assets/icons/search_by_department.svg'}
                  alt="search by department"
                  className="size-5"
                />
              </div>
              Lọc theo Chuyên khoa
            </div>
            <p className="text-sm font-medium text-gray-500 3xl:text-base">
              Tìm bác sĩ theo đúng chuyên khoa
            </p>
            <img
              src="/assets/images/arrow_bg.png"
              alt="bg"
              className={clsx(
                'absolute right-[20%] top-1/2 -translate-y-1/2',
                searchByDepartment ? 'block' : 'hidden',
              )}
            />
          </div>
        </div>

        <div id="search_results" className="bg-white p-6 lg:p-10">
          {/* Bàn phím */}
          {searchByName && (
            <div className="space-y-6 py-6">
              <h3 className="text-center text-base font-semibold text-black xl:text-lg 2xl:text-xl">
                Tìm kiếm bác sĩ theo tên
              </h3>
              <div className="mx-auto flex flex-wrap justify-center gap-6 md:max-w-[456px] lg:max-w-[564px] xl:max-w-[648px] 2xl:max-w-[732px] 3xl:max-w-[900px]">
                {letters.map((letter: string, index: number) => (
                  <button
                    className={clsx(
                      'flex size-10 cursor-pointer items-center justify-center rounded-xl text-xl font-semibold hover:bg-primary-300 hover:text-primary-50 md:size-[56px] md:text-2xl lg:size-[60px] lg:text-[28px]',
                      selectedLetter === letter
                        ? 'bg-primary-600 text-primary-50'
                        : 'text-gray-500',
                    )}
                    key={index}
                    onClick={() => setSelectedLetter(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dropdown chuyen khoa */}
          {searchByDepartment && (
            <div className="space-y-6 py-6">
              <h3 className="text-center text-base font-semibold text-black xl:text-lg 2xl:text-xl">
                Tìm kiếm bác sĩ theo chuyên khoa
              </h3>

              <div className="mx-auto w-full bg-transparent md:max-w-[600px] md:px-0 md:py-0 lg:max-w-[800px] 3xl:block">
                <form
                  ref={panelRef}
                  className="relative flex items-center justify-between rounded-[6px] bg-white px-3 py-2 shadow-md 3xl:p-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div
                    className="flex flex-1 cursor-pointer items-center gap-6 text-[#0F2F64]"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    {selectedDepartment
                      ? selectedDepartment.title
                      : 'Chọn chuyên khoa'}
                    <img
                      src="/assets/icons/chevron_down_gray.svg"
                      alt="chevron down"
                      className={clsx(
                        'size-4 transition-all',
                        isDropdownOpen ? 'rotate-180' : 'rotate-0',
                      )}
                    />
                  </div>
                  <button
                    type="button"
                    className="flex size-10 items-center justify-center rounded-[4px] bg-primary-600 p-3 text-white md:size-auto md:gap-4 3xl:px-8 3xl:py-4"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    <span className="hidden md:block">Chọn</span>
                    <img
                      src="/assets/icons/arrow_right_white.svg"
                      alt="arrow right"
                    />
                  </button>
                  <div
                    className={clsx(
                      'absolute left-1/2 top-[calc(100%+16px)] z-[20] w-full -translate-x-1/2 rounded-[6px] bg-white p-6 shadow-xl transition-all',
                      isDropdownOpen
                        ? 'max-h-[4000px] opacity-100'
                        : 'hidden max-h-0 opacity-0',
                    )}
                  >
                    <div className="h-full md:hidden">
                      {parentGroups.map((pGroup: any) => (
                        <DepartmentDropdownItem
                          pGroup={pGroup}
                          isOpen={activeParentGroup === pGroup.slug}
                          key={pGroup.slug}
                          onClick={() => setActiveParentGroup(pGroup.slug)}
                          setSelectedDepartment={(dept: any) => {
                            setSelectedDepartmentBySlug(dept.slug);
                            setIsDropdownOpen(false);
                          }}
                          setIsDropdownOpen={setIsDropdownOpen}
                        />
                      ))}
                    </div>

                    <div className="hidden md:flex md:gap-8">
                      <div className="space-y-2">
                        {parentGroups.map((pGroup: any) => {
                          const isOpen = activeParentGroup === pGroup.slug;
                          return (
                            <div
                              onClick={() => setActiveParentGroup(pGroup.slug)}
                              className={clsx(
                                'flex cursor-pointer items-center justify-between rounded-[4px] p-2 font-bold uppercase',
                                isOpen
                                  ? 'bg-primary-600 text-primary-50'
                                  : 'bg-white text-black',
                              )}
                              key={pGroup.slug}
                            >
                              <span>{pGroup.title}</span>
                              <img
                                src={'/assets/icons/chevron_down_gray.svg'}
                                className={clsx(
                                  'ml-2 h-4 w-4 transition-transform duration-200',
                                  isOpen
                                    ? 'rotate-180 brightness-0 invert'
                                    : 'rotate-0',
                                )}
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-1 flex-wrap gap-x-4">
                        {currentParentGroup?.departments &&
                          currentParentGroup?.departments?.map((dep: any) => (
                            <div
                              key={dep.slug}
                              className="w-[calc(50%-16px)] cursor-pointer py-2.5 text-sm font-semibold text-primary-1000"
                              onClick={() => {
                                setSelectedDepartmentBySlug(dep.slug);
                                setIsDropdownOpen(false);
                              }}
                            >
                              {dep.title}
                            </div>
                          ))}

                        {currentParentGroup?.children_groups &&
                          currentParentGroup?.children_groups?.map(
                            (childGroup: any) => (
                              <div
                                key={childGroup.slug}
                                className='text-primary-1000" w-[calc(50%-16px)] py-2.5 text-sm font-semibold'
                              >
                                <h4 className="font-bold uppercase text-gray-400">
                                  {childGroup.title}
                                </h4>
                                {childGroup?.departments?.map((dep: any) => (
                                  <div
                                    key={'child_dep_' + dep.slug}
                                    onClick={() => {
                                      setSelectedDepartmentBySlug(dep.slug);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="cursor-pointer py-2.5 text-sm font-semibold text-primary-1000"
                                  >
                                    {dep.title}
                                  </div>
                                ))}
                              </div>
                            ),
                          )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Hiển thị kết quả */}
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center xl:mb-4 3xl:mb-5">
            <div className="gap-1.5 text-base font-medium text-gray-700">
              <span className="text-xl font-semibold text-primary-600">
                {totalItem}{' '}
              </span>
              kết quả phù hợp
              {(searchText || selectedLetter || selectedDepartment) && (
                <span> với tìm kiếm:</span>
              )}
              {searchText && (
                <span className="font-semibold text-primary-600">
                  {' '}
                  &quot;{searchText}&quot;
                </span>
              )}
              {selectedLetter && (
                <span className="font-semibold text-primary-600">
                  {' '}
                  chữ cái &quot;{selectedLetter}&quot;
                </span>
              )}
              {selectedDepartment && (
                <span className="font-semibold text-primary-600">
                  {' '}
                  khoa &quot;{selectedDepartment.title}&quot;
                </span>
              )}
            </div>

            {(!!searchText || !!searchByName || !!searchByDepartment) && (
              <>
                <div className="hidden h-4 w-[1px] bg-gray-300 md:block"></div>

                <div
                  onClick={resetFilter}
                  className="flex cursor-pointer items-center justify-end gap-1.5 align-middle font-medium text-[#ED5252] lg:text-lg"
                >
                  Xóa bộ lọc
                  <img src="/assets/icons/close_red.svg" alt="close_red" />
                </div>
              </>
            )}
          </div>

          {/* Danh sách với loading overlay */}
          <div className="relative">
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="size-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
                  <p className="text-lg font-medium text-gray-700">
                    Đang tải...
                  </p>
                </div>
              </div>
            )}

            {/* Danh sách */}
            {doctors && doctors.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 lg:gap-10 xl:grid-cols-2">
                {doctors.map((doctor: any, index: number) => (
                  <DoctorCard key={index} doctor={doctor} />
                ))}
              </div>
            ) : (
              !loading && (
                <div className="flex h-[300px] items-center justify-center text-center">
                  <div>
                    <p className="text-xl text-black">Không tìm thấy kết quả</p>
                    <p className="text-base text-[#6C6C71]">
                      Không có bác sĩ phù hợp với tìm kiếm của bạn. Vui lòng thử
                      lại
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          <ThePagination
            currentPage={currentPage}
            totalPage={totalPage}
            setPage={(page: number) => {
              setPage(page);
              handleScrollTo('search_results', conditions);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default DoctorList;

const DepartmentDropdownItem = ({
  pGroup,
  isOpen,
  onClick,
  setSelectedDepartment,
  setIsDropdownOpen,
}: {
  pGroup: any;
  isOpen: boolean;
  onClick: () => void;
  setSelectedDepartment: (d: any) => void;
  setIsDropdownOpen: (v: boolean) => void;
}) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <div onClick={onClick}>
      <div
        onClick={() => setOpen(!isOpen)}
        className={clsx(
          'flex items-center justify-between rounded-[4px] p-2 font-bold uppercase',
          isOpen ? 'bg-primary-600 text-primary-50' : 'bg-white text-black',
        )}
        key={pGroup.slug}
      >
        {pGroup.title}
        <img
          src={'/assets/icons/chevron_down_gray.svg'}
          className={clsx(
            'ml-2 h-4 w-4 transition-transform duration-200',
            isOpen ? 'rotate-180 brightness-0 invert' : 'rotate-0',
          )}
        />
      </div>
      {open && (
        <div
          className={clsx(
            'p-3',
            isOpen ? 'max-h-[4000px] opacity-100' : 'hidden max-h-0 opacity-0',
          )}
        >
          {pGroup?.departments &&
            pGroup?.departments?.map((dep: any) => (
              <div
                key={dep.slug}
                className="py-2.5 text-sm font-semibold text-primary-1000"
                onClick={() => {
                  setSelectedDepartment(dep);
                  setIsDropdownOpen(false);
                }}
              >
                {dep.title}
              </div>
            ))}

          <div className="space-y-4">
            {pGroup?.children_groups &&
              pGroup?.children_groups?.map((childGroup: any) => (
                <div key={childGroup.slug}>
                  <h4 className="font-bold uppercase text-gray-400">
                    {childGroup.title}
                  </h4>
                  {childGroup?.departments?.map((dep: any) => (
                    <div
                      key={'child_dep_' + dep.slug}
                      className="py-2.5 text-sm font-semibold text-primary-1000"
                      onClick={() => {
                        setSelectedDepartment(dep);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {dep.title}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'G',
  'H',
  'I',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'X',
  'Y',
];

const InfoRow = ({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-1.5">
    <img src={icon} alt="icon" className="size-5" />
    <p className="gray-700 text-base font-normal lg:text-lg xl:text-base">
      {children}
    </p>
  </div>
);

const DoctorCard = ({ doctor }: { doctor: any }) => {
  const {
    avatar,
    full_title,
    full_name,
    specialty,
    hospital_title = '',
    slug,
    departments = [],
    department_groups = [],
  } = doctor || {};

  const department = departments[0]?.department;
  const instituteTitle = department_groups[0]?.department_groups_slug?.title;
  const titles = getDoctorTitles(doctor);

  const isWorkingInDirectorBoard = ['director', 'deputy_director'].includes(
    hospital_title,
  );

  return (
    <div className="flex flex-col gap-5 rounded-2xl border-[2px] border-white bg-white p-5 shadow-lg transition-all hover:border-primary-600 md:flex-row md:p-4 xl:p-4 2xl:p-5">
      <div className="flex h-full items-center justify-center">
        <CustomLink
          href={'/doi-ngu-bac-si/' + slug}
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[10px] bg-gray-100 md:max-h-[280px] md:w-[192px] lg:w-[224px] xl:w-[192px] 2xl:w-[224px]"
        >
          <NextImg
            src={getAssetUrlById(avatar)}
            alt="doctor avatar"
            objectFit="cover"
            className="-top-[8%] object-top"
          />
        </CustomLink>
      </div>

      <div className="flex flex-1 flex-col justify-center md:px-5 lg:justify-between xl:justify-center xl:px-0 2xl:justify-between">
        <div>
          <div className="text-sm font-normal text-gray-500 lg:text-base xl:text-sm 2xl:text-base">
            {full_title}
          </div>

          <div className="my-1 text-xl font-bold text-primary-1000 lg:text-2xl xl:text-xl 2xl:text-2xl">
            {full_name}
          </div>

          <div className="mb-5">
            {titles.map((title: string, idx: number) => (
              <div key={idx} className="text-sm font-medium text-primary-500">
                {title}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {specialty && (
              <InfoRow icon="/assets/icons/first_aid_black.svg">
                {specialty}
              </InfoRow>
            )}

            {isWorkingInDirectorBoard && (
              <InfoRow icon="/assets/icons/hospital_location_black.svg">
                Ban giám đốc Bệnh viện
              </InfoRow>
            )}

            {instituteTitle && (
              <InfoRow icon="/assets/icons/hospital_location_black.svg">
                {instituteTitle}
              </InfoRow>
            )}

            {department && (
              <InfoRow icon="/assets/icons/hospital_location_black.svg">
                {department.title} ({department.code})
              </InfoRow>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1 4xl:grid-cols-2">
          {/* <Link
            href="#"
            aria-label="Đặt lịch khám"
            className="btn-danger relative w-full justify-center"
          >
            Đặt lịch khám
            <div className="relative size-4">
              <NextImg src="/assets/icons/phone2_white.svg" alt="phone icon" />
            </div>
          </Link> */}

          {/* <Link
            href={`/vi/doi-ngu-bac-si/${slug}`}
            locale="vi"
            className="btn-view-detail w-full justify-center"
            aria-label="Xem chi tiết bác sĩ"
          >
            Xem chi tiết
            <img
              src="/assets/icons/arrow_right_black.svg"
              alt="arrow right"
              className="size-6 group-hover:brightness-0 group-hover:invert"
            />
          </Link> */}

          <Link
            href={'/vi/doi-ngu-bac-si/' + slug}
            className="flex items-center gap-2 font-medium text-gray-950 group-hover:text-primary-50 lg:text-lg"
          >
            Xem chi tiết
            <img
              src="/assets/icons/arrow_right_black.svg"
              alt="arrow right"
              className="size-6 group-hover:brightness-0 group-hover:invert"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

