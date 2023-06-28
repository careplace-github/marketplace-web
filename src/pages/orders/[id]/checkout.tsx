// next
import Head from 'next/head';

// layouts
import SimpleLayout from 'src/layouts/simple';
// features
import { CheckoutView } from 'src/features/payments';
import { AuthGuard } from 'src/features/auth';

// ----------------------------------------------------------------------

CheckoutPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

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
