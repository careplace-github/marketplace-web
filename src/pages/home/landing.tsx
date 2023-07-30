// next
import Head from 'next/head';
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

  router.push(PATHS.companies.root);

  return (
    !redirectToCompanies && (
      <>
        <Head>
          <title>Careplace</title>
        </Head>

        <GuestGuard>
          <LandingView />
        </GuestGuard>
      </>
    )
  );
}
