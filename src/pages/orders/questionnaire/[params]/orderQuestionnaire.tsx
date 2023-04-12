// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../../../layouts/main';
// sections
import { OrderQuestionnaireView } from '../../../../views';

// ----------------------------------------------------------------------

OrderQuestionnaire.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
  );

// ----------------------------------------------------------------------

export default function OrderQuestionnaire() {
  return (
    <>
      <Head>
        <title>Novo Pedido: Apoio Domiciliário | Careplace</title>
      </Head>

      <OrderQuestionnaireView />
    </>
  );
}
