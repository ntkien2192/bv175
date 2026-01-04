import React, { Suspense } from 'react';
import '../../styles/globals.css';
import '../../styles/swiper-custom.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '../../providers/theme-provider';
import { fnGetMetadata } from '../../services/metadata';
import { MetadataProvider } from '../../providers/MetadataProvider';
import 'react-toastify/dist/ReactToastify.css';
import { GsapMatchMediaProvider } from '../../providers/GsapMatchMediaProvider';
import { ScrollSmootherProvider } from '../../providers/ScrollSmootherProvider';
import ScrollSmoothWrapper from '../../components/animation/ScrollSmoothWrapper';
import TheHeader from '../../components/common/the-header';
import TheFooter from '../../components/common/the-footer';
import BackToTop from '../../components/common/back-to-top';
import ReCaptchatProvider from '@/src/providers/GoogleRecaptchaProvider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';


export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}
export const dynamic = 'force-dynamic';


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const metadata = await fnGetMetadata(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/logo/favicon-16x16.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/logo/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/logo/android-chrome-192x192.png"
        ></link>
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="180x180"
          href="/assets/logo/apple-touch-icon-180x180.png"
        ></link>

        <link rel="manifest" href="/manifest.json" />
        <meta
          name="msapplication-TileImage"
          content="/assets/logo/logo-icon-270x270.png"
        ></meta>

        <meta name="robots" content="index" />
        <meta name="format-detection" content="telephone=no" />
      </head>

      <body className="antialiased">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          closeButton={false}
          className={'z-[99999] text-sm'}
        />
        <ReCaptchatProvider>
          <MetadataProvider value={metadata}>
            <NextIntlClientProvider messages={messages}>
              <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                <GsapMatchMediaProvider>
                  <ScrollSmootherProvider>
                    <Suspense fallback={<></>}>
                      <TheHeader />
                    </Suspense>
                    <BackToTop />
                    {/* <ScrollSmoothWrapper> */}
                    {children}
                    <TheFooter />
                    {/* </ScrollSmoothWrapper> */}
                  </ScrollSmootherProvider>
                </GsapMatchMediaProvider>
              </ThemeProvider>
            </NextIntlClientProvider>
          </MetadataProvider>
        </ReCaptchatProvider>
      </body>
    </html>
  );
}
