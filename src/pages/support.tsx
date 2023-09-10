// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// PATHS
import { PATHS } from 'src/routes';
// sections
import SupportView from 'src/features/common/views/SupportView';

// ----------------------------------------------------------------------

SupportPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function SupportPage() {
  return (
    <>
      <Head>
        <title>Suporte | Careplace</title>
      </Head>

      <SupportView />
    </>
  );
}
