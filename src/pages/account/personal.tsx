// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountPersonalView } from 'src/features/account';
import { useAuthContext } from 'src/contexts';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

AccountPersonalPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountPersonalPage() {
  const { user, isInitialized } = useAuthContext();
  return (
    <>
      <Head>
        <title>Conta | Careplace</title>
      </Head>

      {user && user.email && <AccountPersonalView />}
      {(!user || !isInitialized) && <LoadingScreen />}
    </>
  );
}
