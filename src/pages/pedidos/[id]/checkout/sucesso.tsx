// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { CheckoutSuccessView } from 'src/features/payments';

// ----------------------------------------------------------------------

CheckoutSuccessPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CheckoutSuccessPage() {
  return (
    <>
      <Head>
        <title>Pagamento Confirmado! | Careplace</title>
      </Head>

      <CheckoutSuccessView />
    </>
  );
}
