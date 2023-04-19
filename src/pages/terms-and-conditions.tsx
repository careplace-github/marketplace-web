// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// features
import { TermsAndConditionsView } from 'src/features/common';

// ----------------------------------------------------------------------

TermsAndConditionsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function TermsAndConditionsPage() {
  return (
    <>
      <Head>
        <title>Termos e Condições | Careplace</title>
      </Head>

      <TermsAndConditionsView />
    </>
  );
}
