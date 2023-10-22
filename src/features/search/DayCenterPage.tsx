// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { CompaniesListView } from 'src/features/companies';

// ----------------------------------------------------------------------

DayCenterPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DayCenterPage() {
  return (
    <>
      <Head>
        <title>Centros de Dia | Careplace</title>
      </Head>

      <CompaniesListView searchType="dayCenter" />
    </>
  );
}
