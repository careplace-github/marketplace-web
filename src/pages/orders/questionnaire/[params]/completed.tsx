// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../../../layouts/main';
// sections
import { OrderQuestionnaireCompletedView } from '../../../../views';

// ----------------------------------------------------------------------

OrderQuestionnaireCompletedPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function OrderQuestionnaireCompletedPage() {
  return (
    <>
      <Head>
        <title>Novo Pedido: Apoio Domiciliário | Careplace</title>
      </Head>

      <OrderQuestionnaireCompletedView />
    </>
  );
}
