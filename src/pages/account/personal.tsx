// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountPersonalView } from 'src/features/account';
import { AuthGuard } from 'src/features/auth';
// auth
import { useSession } from 'next-auth/react';

// ----------------------------------------------------------------------

AccountPersonalPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountPersonalPage() {
  const { data: user } = useSession();
  return (
    <>
      <Head>
        <title>Conta | Careplace</title>
      </Head>

      <AuthGuard>{user?.email && <AccountPersonalView updatedUser={user} />}</AuthGuard>
    </>
  );
}
