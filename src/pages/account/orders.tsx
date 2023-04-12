// next
import Head from 'next/head';
// 
// layouts
import MainLayout from '../../layouts/main';
// sections
import { AccountOrdersView } from '../../views';

// ----------------------------------------------------------------------

AccountOrdersPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function AccountOrdersPage() {
  return (
    <>
      <Head>
        <title>Conta: Pedidos | Careplace</title>
      </Head>

      <AccountOrdersView />
    </>
  );
}
