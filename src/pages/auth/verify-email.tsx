// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// features
import VerifyEmailView from 'src/features/auth/views/VerifyEmailView';

// ----------------------------------------------------------------------

VerifyEmailPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function VerifyEmailPage() {
  return (
    <>
      <Head>
        <title>Verificar Email | Careplace </title>
      </Head>

      <VerifyEmailView />
    </>
  );
}
