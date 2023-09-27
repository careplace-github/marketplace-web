// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { CompaniesListView } from 'src/features/companies';

// ----------------------------------------------------------------------

CompaniesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CompaniesPage() {
  return (
    <>
      <Head>
        <title>Plataforma de Apoio Domiciliário | Careplace</title>
      </Head>

      <CompaniesListView />
    </>
  );
}
