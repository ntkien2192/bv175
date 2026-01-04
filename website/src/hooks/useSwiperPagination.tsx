import { useEffect, useState } from 'react';
import type { PaginationOptions } from 'swiper/types';

export default function useSwiperPagination() {
  const [pagination, setPagination] = useState<{
    paginationClass: string;
    paginationConfig: PaginationOptions;
  } | null>(null);

  useEffect(() => {
    const unique = `swiper-custom-${Math.random().toString(36).substring(2, 9)}`;
    const paginationClass = `swiper-bullets-container ${unique}`;
    const selector = `.swiper-bullets-container.${unique}`;
    const paginationConfig: PaginationOptions = {
      clickable: true,
      type: 'bullets',
      el: selector,
      bulletElement: 'div',
    };
    setPagination({ paginationClass, paginationConfig });
  }, []);

  return {
    ...pagination,
  };
}