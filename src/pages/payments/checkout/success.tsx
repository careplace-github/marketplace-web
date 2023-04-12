// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../../layouts/main';
// sections
import { CheckoutSuccessView
 } from '../../../views';

// ----------------------------------------------------------------------

CheckoutSuccessPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);


// ----------------------------------------------------------------------

export default function CheckoutSuccessPage() {
  return (
    <>
      <Head>
        <title>Pagamento Confirmado! | Careplace</title>
      </Head>

      <CheckoutSuccessView
       />
    </>
  );
}
