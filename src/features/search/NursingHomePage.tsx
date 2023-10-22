// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { CompaniesListView } from 'src/features/companies';

// ----------------------------------------------------------------------

NursingHomePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function NursingHomePage() {
  return (
    <>
      <Head>
        <title>Lares de Idosos | Careplace</title>
      </Head>

      <CompaniesListView searchType="nursingHome" />
    </>
  );
}
