// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { ServicesListView } from 'src/features/services';

// ----------------------------------------------------------------------

ServicesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

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
