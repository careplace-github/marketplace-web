// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { CompaniesListView } from 'src/features/companies';

// ----------------------------------------------------------------------

SeniorResidencePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function SeniorResidencePage() {
  return (
    <>
      <Head>
        <title>Residências Sénior | Careplace</title>
      </Head>

      <CompaniesListView searchType="seniorResidence" />
    </>
  );
}
