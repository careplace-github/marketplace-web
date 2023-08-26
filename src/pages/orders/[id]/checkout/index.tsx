// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// features
import { CheckoutView } from 'src/features/payments';
import { AuthGuard } from 'src/features/auth';

// ----------------------------------------------------------------------

CheckoutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Pagamento | Careplace</title>
      </Head>
      <AuthGuard>
        <CheckoutView />
      </AuthGuard>
    </>
  );
}
