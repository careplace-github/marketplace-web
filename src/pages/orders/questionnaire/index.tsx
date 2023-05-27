// next
import Head from 'next/head';
// Auth guard
import { AuthGuard } from 'src/features/auth';
// layouts
import MainLayout from 'src/layouts/main';
// features
import { OrderQuestionnaireView } from 'src/features/orders';

// ----------------------------------------------------------------------

OrderQuestionnaire.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function OrderQuestionnaire() {
  return (
    <>
      <Head>
        <title>Novo Pedido: Apoio Domiciliário | Careplace</title>
      </Head>

      <AuthGuard>
        <OrderQuestionnaireView />
      </AuthGuard>
    </>
  );
}
