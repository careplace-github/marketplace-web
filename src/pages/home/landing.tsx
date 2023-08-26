// next
import Head from 'next/head';
// react
import { useEffect } from 'react';
// layouts
import MainLayout from 'src/layouts/main';
// features
import { GuestGuard } from 'src/features/auth';
import { LandingView } from 'src/features/home';
// router
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';

// ----------------------------------------------------------------------

LandingPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function LandingPage() {
  const redirectToCompanies = true;
  const router = useRouter();

  useEffect(() => {
    if (redirectToCompanies) {
      router.push(PATHS.companies.root);
    }
  }, [redirectToCompanies]);

  return (
    <>
      {!redirectToCompanies && (
        <>
          <Head>
            <title>Careplace</title>
          </Head>

          <GuestGuard>
            <LandingView />
          </GuestGuard>
        </>
      )}
    </>
  );
}
