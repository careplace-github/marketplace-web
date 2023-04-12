// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { LandingView } from 'src/views';

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

