// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountPaymentView } from 'src/features/account';

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
