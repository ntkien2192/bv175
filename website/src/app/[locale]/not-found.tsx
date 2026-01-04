import { Link } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function NotFound() {
  const t = useTranslations('Common');
  return (
    <section className="padding-top-body">
      <div className="section-title container py-[150px] text-center flex flex-col items-center gap-3 lg:gap-4 xl:gap-5 3xl:gap-6">
        <h2>{t('empty-page')}</h2>
        <Link href="/" className="btn-danger">
          {t('return-home')}
        </Link>
      </div>
    </section>
  );
}
