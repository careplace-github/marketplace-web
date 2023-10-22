// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// features
import VerifyPhoneView from 'src/features/auth/views/VerifyPhoneView';

// ----------------------------------------------------------------------

VerifyPhonePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function VerifyPhonePage() {
  return (
    <>
      <Head>
        <title>Verificar telemóvel | Careplace </title>
      </Head>

      <VerifyPhoneView />
    </>
  );
}
