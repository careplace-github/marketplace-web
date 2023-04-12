// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../../layouts/main';
// sections
import { CompanyDetailView } from '../../../views';

// ----------------------------------------------------------------------

CompanyDetailPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function CompanyDetailPage() {
  return (
    <>
      <Head>
        <title>Empresa de Serviço de Apoio Domiciliário | Careplace</title>
      </Head>

      <CompanyDetailView />
    </>
  );
}
