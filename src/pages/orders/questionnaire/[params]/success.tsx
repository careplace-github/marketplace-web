// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../../../layouts/main';
// sections
import { OrderQuestionnaireCompletedView } from '../../../../views';

// ----------------------------------------------------------------------

TravelOrderCompletedPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function TravelOrderCompletedPage() {
  return (
    <>
      <Head>
        <title>Order Completed | Careplace</title>
      </Head>

      <OrderQuestionnaireCompletedView />
    </>
  );
}
