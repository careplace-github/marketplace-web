// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../layouts/main';
// sections
import { CompaniesListView } from '../../views';

// ----------------------------------------------------------------------

CompaniesPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);


// ----------------------------------------------------------------------

export default function CompaniesPage() {
  return (
    <>
      <Head>
        <title>Encontrar Cuidador Domiciliário | Careplace</title>
      </Head>

      <CompaniesListView />
    </>
  );
}
