// next
import Head from 'next/head';
 
// layouts
import SimpleLayout from '../../../layouts/simple';
// sections
import { CheckoutView } from '../../../views';

// ----------------------------------------------------------------------

CheckoutPage.getLayout = (page: React.ReactElement) => (
  <SimpleLayout>{page}</SimpleLayout>
);


// ----------------------------------------------------------------------

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Pagamento | Careplace</title>
      </Head>

      <CheckoutView />
    </>
  );
}
