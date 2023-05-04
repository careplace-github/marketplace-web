// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// features
import { PrivacyPolicyView } from 'src/features/common';

// ----------------------------------------------------------------------

PrivacyPolicyPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Política de Privacidade | Careplace</title>
      </Head>

      <PrivacyPolicyView />
    </>
  );
}
