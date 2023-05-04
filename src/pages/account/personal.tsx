// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountPersonalView } from 'src/features/account';
import { AuthGuard } from 'src/features/auth';

// ----------------------------------------------------------------------

AccountPersonalPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountPersonalPage() {
  return (
    <>
      <Head>
        <title>Conta | Careplace</title>
      </Head>

      <AuthGuard>
        <AccountPersonalView />
      </AuthGuard>
    </>
  );
}
