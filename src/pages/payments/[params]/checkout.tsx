// next
import Head from 'next/head';
 
// layouts
import SimpleLayout from '../../../layouts/simple';
// sections
import { CheckoutView } from '../../../views';

// ----------------------------------------------------------------------

PaymentPage.getLayout = (page: React.ReactElement) => (
  <SimpleLayout>{page}</SimpleLayout>
);


// ----------------------------------------------------------------------

export default function PaymentPage() {
  return (
    <>
      <Head>
        <title>Payment | Careplace</title>
      </Head>

      <CheckoutView />
    </>
  );
}
