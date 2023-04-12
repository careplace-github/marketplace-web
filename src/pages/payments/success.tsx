// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../layouts/main';
// sections
import { CheckoutCompletedView
 } from '../../views';

// ----------------------------------------------------------------------

EcommerceOrderCompletedPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);


// ----------------------------------------------------------------------

export default function EcommerceOrderCompletedPage() {
  return (
    <>
      <Head>
        <title>Pagamento Confirmado! | Careplace</title>
      </Head>

      <CheckoutCompletedView
       />
    </>
  );
}
