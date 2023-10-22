// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { CompaniesListView } from 'src/features/companies';

// ----------------------------------------------------------------------

HomeCarePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function HomeCarePage() {
  return (
    <>
      <Head>
        <title>Apoio Domiciliário | Careplace</title>
      </Head>

      <CompaniesListView searchType="homeCare" />
    </>
  );
}
