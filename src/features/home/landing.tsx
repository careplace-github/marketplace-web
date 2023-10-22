// next
import Head from 'next/head';
// react
import { useEffect } from 'react';
// layouts
import MainLayout from 'src/layouts/main';
// features
import { GuestGuard } from 'src/features/auth';
// import { LandingView } from 'src/features/home';
import { LandingView } from 'src/features/home';
// router
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';

// ----------------------------------------------------------------------

LandingPage.getLayout = (page: React.ReactElement) => <MainLayout hideSearchbar>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Careplace</title>
      </Head>

      <LandingView />
    </>
  );
}
