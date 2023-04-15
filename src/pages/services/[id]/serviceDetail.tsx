// next
import Head from 'next/head';
 
// layouts
import MainLayout from 'src/layouts/main';
// features
import { ServiceDetailView } from 'src/features/services';

// ----------------------------------------------------------------------

ServiceDetailPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function ServiceDetailPage() {
  return (
    <>
      <Head>
        <title>Serviço de Apoio Domiciliário | Careplace</title>
      </Head>

      <ServiceDetailView />
    </>
  );
}
