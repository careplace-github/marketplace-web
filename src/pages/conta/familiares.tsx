// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountRelativesView } from 'src/features/account';
import { AuthGuard } from 'src/features/auth';

// ----------------------------------------------------------------------

AccountRelativestPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountRelativestPage() {
  return (
    <>
      <Head>
        <title>Conta: Familiares | Careplace</title>
      </Head>

      <AuthGuard>
        <AccountRelativesView />
      </AuthGuard>
    </>
  );
}
