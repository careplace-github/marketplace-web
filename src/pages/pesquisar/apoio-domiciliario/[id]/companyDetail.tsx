// next
import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
// features
import { CompanyDetailView } from 'src/features/companies';
import { useAuthContext } from 'src/contexts';
import axios from 'src/lib/axios';

// ----------------------------------------------------------------------

CompanyDetailPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CompanyDetailPage() {
  return (
    <>
      <Head>
        <title>Empresa de Apoio Domiciliário: Lisboa | Careplace</title>
      </Head>

      <CompanyDetailView />
    </>
  );
}
