// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import Head from 'next/head';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Script from 'next/script';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// theme
import ThemeProvider from 'src/theme';
// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// components
import ProgressBar from 'src/components/progress-bar';
import { ThemeSettings, SettingsProvider } from 'src/features/settings';
import MotionLazyContainer from 'src/components/animate/MotionLazyContainer';
import { AuthProvider } from 'src/features/auth';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const trackingID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        {/*<!-- Google tag (gtag.js) -->*/}
        {trackingID && (
          <>
            <Script
              strategy="afterInteractive" // Do not block page rendering while loading Google Tag Manager
              src={`https://www.googletagmanager.com/gtag/js?id=${trackingID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive" // Do not block page rendering while loading Google Tag Manager
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${trackingID}');
          `}
            </Script>
          </>
        )}
      </Head>

      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <ThemeProvider>
              <ThemeSettings>
                <MotionLazyContainer>
                  <ProgressBar />
                  {getLayout(<Component {...pageProps} />)}
                </MotionLazyContainer>
              </ThemeSettings>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
