// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountPaymentView } from 'src/features/account';
import { AuthGuard } from 'src/features/auth';

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

<AuthGuard>
<AccountPaymentView />
</AuthGuard>
      
    </>
  );
}
