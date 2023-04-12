// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../../layouts/main';
// sections
import { ServiceDetailView } from '../../../views';

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
