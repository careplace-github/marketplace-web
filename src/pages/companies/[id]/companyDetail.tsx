// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { CompanyDetailView } from 'src/features/companies';

// ----------------------------------------------------------------------

CompanyDetailPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

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
