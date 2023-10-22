// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountPersonalView } from 'src/features/account';
import { AuthGuard } from 'src/features/auth';
// auth
import { useAuthContext } from 'src/contexts';

// ----------------------------------------------------------------------

AccountPersonalPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountPersonalPage() {
  const { user } = useAuthContext();
  return (
    <>
      <Head>
        <title>Conta | Careplace</title>
      </Head>

      <AuthGuard>{user?.email && <AccountPersonalView updatedUser={user} />}</AuthGuard>
    </>
  );
}
