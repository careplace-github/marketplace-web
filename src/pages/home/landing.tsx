// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// features
import { LandingView } from 'src/features/home';

// ----------------------------------------------------------------------

TravelLandingPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function TravelLandingPage() {
  return (
    <>
      <Head>
        <title>Careplace</title>
      </Head>

      <LandingView />
    </>
  );
}

