// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// features
import  { GuestGuard } from 'src/features/auth';
import { LandingView } from 'src/features/home';
import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATHS } from 'src/routes/paths';

// ----------------------------------------------------------------------

LandingPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function LandingPage() {
  
  return (
    <>
      <Head>
        <title>Careplace</title>
      </Head>


      <GuestGuard>
      <LandingView />
      </GuestGuard>
      
    </>
  );
}

