// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { OrderQuestionnaireCompletedView } from 'src/features/orders';

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
