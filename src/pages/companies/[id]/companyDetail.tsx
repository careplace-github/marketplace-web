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
        <title>Italian Delights - 12 Days | Careplace</title>
      </Head>

      <CompanyDetailView />
    </>
  );
}
