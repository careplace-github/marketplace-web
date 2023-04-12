// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../layouts/main';
// sections
import { ServicesListView } from '../../views';

// ----------------------------------------------------------------------

ServicesPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);


// ----------------------------------------------------------------------

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Serviços de Apoio Domiciliário | Careplace</title>
      </Head>

      <ServicesListView />
    </>
  );
}
