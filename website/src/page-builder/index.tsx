'use client';

import dynamic from 'next/dynamic';
import {
  CommonSection,
  PageContent,
  SectionMap,
} from '@/src/types/pageBuilder';
import { notFound } from 'next/navigation';

const sectionMap: SectionMap = {
  // Home
  'hero-with-top-big-image': dynamic(() =>
    import('../components/sections/hero').then((m) => m.HeroWithTopImage),
  ),
  'feature-with-image-4-col': dynamic(() =>
    import('../components/sections/feature').then(
      (m) => m.FeatureWithImage4Col,
    ),
  ),
  'team-slider-5-col': dynamic(() =>
    import('../components/sections/team').then((m) => m.TeamSlider5Col),
  ),
  'logo-slider': dynamic(() =>
    import('../components/sections/slider').then((m) => m.LogoSlider),
  ),
  'posts-3-col': dynamic(
    () => import('../components/sections/post-grid').then((m) => m.Posts3Col),
    // { ssr: false },
  ),
  'feature-4-col': dynamic(() =>
    import('../components/sections/feature').then((m) => m.Feature4Col),
  ),
  'feature-3-col': dynamic(
    () => import('../components/sections/feature').then((m) => m.Feature3Col),
    // { ssr: false },
  ),
  'number-none': dynamic(() =>
    import('../components/sections/number').then((m) => m.NumberNone),
  ),
  'number-grid': dynamic(() =>
    import('../components/sections/number').then((m) => m.NumberGrid),
  ),
  'gallery-with-text': dynamic(() =>
    import('../components/sections/gallery').then((m) => m.GalleryWithText),
  ),
  'review-split-with-text': dynamic(() =>
    import('../components/sections/review').then((m) => m.ReviewSplitWithText),
  ),

  // About us
  'hero-background-focus-2': dynamic(() =>
    import('../components/sections/hero').then((m) => m.HeroBackgroundFocus2),
  ),
  'info-basic': dynamic(() =>
    import('../components/sections/information').then((m) => m.InfoBasic),
  ),
  'card-2-col': dynamic(() =>
    import('../components/sections/card').then((m) => m.Card2Col),
  ),
  'card-slider': dynamic(() =>
    import('../components/sections/card').then((m) => m.CardSlider),
  ),
  'info-split-with-features-image': dynamic(() =>
    import('../components/sections/information').then(
      (m) => m.InfoWithFeaturesImage,
    ),
  ),
  'info-center-block': dynamic(() =>
    import('../components/sections/information').then((m) => m.InfoCenterBlock),
  ),
  'info-basic-r': dynamic(() =>
    import('../components/sections/information').then((m) => m.InfoBasicR),
  ),
  'team-4-col': dynamic(() =>
    import('../components/sections/team').then((m) => m.Team4Col),
  ),
  'card-slider-with-l-r-button': dynamic(() =>
    import('../components/sections/card').then(
      (m) => m.CardSliderWithLeftRightButton,
    ),
  ),

  // Hospital leader
  'card-slider-with-blurb': dynamic(() =>
    import('../components/sections/card').then((m) => m.CardSliderWithBlurb),
  ),
  'team-grid': dynamic(() =>
    import('../components/sections/team').then((m) => m.TeamGrid),
  ),
  'gallery-alternate': dynamic(() =>
    import('../components/sections/gallery').then((m) => m.GalleryAlternate),
  ),
  'team-3-col': dynamic(() =>
    import('../components/sections/team').then((m) => m.Team3Col),
  ),

  // News
  'info-news': dynamic(() =>
    import('../components/sections/news').then((m) => m.HotNewsHero),
  ),
  'posts-small-image-3-col': dynamic(
    () => import('../components/sections/news').then((m) => m.NewsListCard),
    // { ssr: false },
  ),

  // News detail
  'breadcrumb-basic': dynamic(
    () =>
      import('../components/sections/breadcrumb').then(
        (m) => m.BreadcrumbBasic,
      ),
    // { ssr: false },
  ),

  'post-detail-with-sidebar-right': dynamic(() =>
    import('../components/sections/news').then((m) => m.NewsDetail),
  ),

  'posts-slider': dynamic(
    () => import('../components/sections/post-grid').then((m) => m.RelatedPost),
    // { ssr: false },
  ),

  'sidebar-right-basic': dynamic(
    () =>
      import('../components/sections/custom').then((m) => m.SideBarRightBasic),
    // { ssr: false },
  ),

  // Department detail
  'hero-with-bottom-big-image': dynamic(() =>
    import('../components/sections/hero').then((m) => m.HeroWithBottomBigImage),
  ),
  'info-with-left-image-top-title': dynamic(() =>
    import('../components/sections/information').then(
      (m) => m.InfoWithLeftImageTopTitle,
    ),
  ),
  'info-with-right-image-top-title': dynamic(() =>
    import('../components/sections/information').then(
      (m) => m.InfoWithRightImageTopTitle,
    ),
  ),
  'team-slider-4-col': dynamic(() =>
    import('../components/sections/team').then((m) => m.TeamSlider4Col),
  ),
  'card-2-col-with-blurb': dynamic(() =>
    import('../components/sections/card').then((m) => m.Card2ColWithBlurb),
  ),
  'number-with-text': dynamic(() =>
    import('../components/sections/number').then((m) => m.NumberWithText),
  ),
  'number-split': dynamic(() =>
    import('../components/sections/number').then((m) => m.NumberSplit),
  ),
  'info-with-right-image': dynamic(() =>
    import('../components/sections/information').then(
      (m) => m.InfoWithRightImage,
    ),
  ),
  'info-with-left-image': dynamic(() =>
    import('../components/sections/information').then(
      (m) => m.InfoWithLeftImage,
    ),
  ),
  'cta-basic': dynamic(() =>
    import('../components/sections/cta').then((m) => m.CtaBasic),
  ),

  // Doctor detail
  'post-detail-with-sidebar-left': dynamic(() =>
    import('../components/doctors').then((m) => m.DoctorDetail),
  ),

  // FAQs
  'hero-background-focus': dynamic(
    () =>
      import('../components/sections/hero').then((m) => m.HeroBackgroundsFocus),
    // { ssr: false },
  ),

  'faqs-1-col': dynamic(
    () => import('../components/sections/faq').then((m) => m.FaqsOneCol),
    // { ssr: false },
  ),

  // Dành cho người bệnh
  'content-danh-cho-nguoi-benh': dynamic(() =>
    import('../components/sections/custom').then(
      (m) => m.ContentDanhChoNguoiBenh,
    ),
  ),
  'faqs-detail-split': dynamic(() =>
    import('../components/sections/faq').then((m) => m.FaqsDetailSplit),
  ),

  // Milestone
  'card-1-col': dynamic(
    () => import('../components/sections/card').then((m) => m.Card1Col),
    // { ssr: false },
  ),

  // Khối cơ quan hành chính
  'card-4-col': dynamic(
    () => import('../components/sections/card').then((m) => m.Card4Col),
    // { ssr: false },
  ),

  // Cơ sở vật chất
  'gallery-slider-tall': dynamic(() =>
    import('../components/sections/gallery').then((m) => m.GallerySliderTall),
  ),

  // Search
  custom: dynamic(
    () => import('../components/sections/custom').then((m) => m.CustomSearch),
    // { ssr: false },
  ),

  // PDF view
  'pdf-viewer': dynamic(() =>
    import('../components/sections/custom').then((m) => m.PDFViewer),
  ),
  'fancybox-viewer': dynamic(() =>
    import('../components/sections/custom').then((m) => m.FancyboxViewer),
  ),

  // Thanh tich
  'posts-2-col': dynamic(() =>
    import('../components/sections/post-grid').then((m) => m.Posts2Col),
  ),

  // Contact
  'cta-background-image': dynamic(() =>
    import('../components/sections/cta').then((m) => m.CtaBackgroundImage),
  ),
  'card-3-col': dynamic(() =>
    import('../components/sections/card').then((m) => m.Card3Col),
  ),
  'cta-with-field': dynamic(() =>
    import('../components/sections/cta').then((m) => m.CtaWithField),
  ),
  'embedded-map': dynamic(() =>
    import('../components/sections/custom').then((m) => m.EmbeddedMap),
  ),

  // Danh sách bác sĩ
  'hero-text-overlay': dynamic(
    () => import('../components/sections/hero').then((m) => m.HeroTextOverlay),
    // { ssr: false },
  ),
  'team-split-with-filter': dynamic(
    () => import('../components/doctors').then((m) => m.DoctorList),
    // { ssr: false },
  ),

  // Chuyên khoa
  'feature-with-image-3-col': dynamic(
    () => import('../components/departments').then((m) => m.DepartmentListPage),
    // { ssr: false },
  ),
  // Chi tiết khối cơ quan
  'team-2-col': dynamic(() =>
    import('../components/sections/team').then((m) => m.Team2Col),
  ),
};

type PageBuilderProps = {
  pageContent: PageContent;
  pageDetail?: any;
};

const PageBuilder = ({ pageContent, pageDetail }: PageBuilderProps) => {
  if (
    !pageContent ||
    !pageContent?.sections ||
    pageContent.sections.length === 0
  ) {
    notFound();
  }
  const sections = pageContent.sections;

  return (
    <>
      <div className="padding-top-body">
        {sections.map((section: CommonSection, index: number) => {
          const SectionComp = sectionMap[section.type];
          if (!SectionComp) return null;

          return (
            <SectionComp
              key={'section_' + index}
              data={section}
              {...(pageDetail ? { dataDetail: pageDetail } : {})}
            />
          );
        })}
      </div>
    </>
  );
};

export default PageBuilder;
