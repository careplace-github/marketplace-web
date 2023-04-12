// next
import Head from 'next/head';
// layouts
import MainLayout from '../../layouts/main';
// sections
import { AccountPaymentView } from '../../views';

// ----------------------------------------------------------------------

AccountPaymentPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);


// ----------------------------------------------------------------------

export default function AccountPaymentPage() {
  return (
    <>
      <Head>
        <title>Conta: Pagamentos | Careplace</title>
      </Head>

      <AccountPaymentView />
    </>
  );
}
