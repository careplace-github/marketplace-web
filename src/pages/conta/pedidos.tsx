// next
import Head from 'next/head';
//
// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountOrdersView } from 'src/features/account';
import { AuthGuard } from 'src/features/auth';
// ----------------------------------------------------------------------

AccountOrdersPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountOrdersPage() {
  return (
    <>
      <Head>
        <title>Conta: Pedidos | Careplace</title>
      </Head>

      <AuthGuard>
        <AccountOrdersView />
      </AuthGuard>
    </>
  );
}