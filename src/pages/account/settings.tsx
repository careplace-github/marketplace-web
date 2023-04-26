// next
import Head from 'next/head';
// 
// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountSettingsView } from 'src/features/account';
import { AuthGuard } from 'src/features/auth';
// ----------------------------------------------------------------------

AccountSettingsPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function AccountSettingsPage() {
  return (
    <>
      <Head>
        <title>Conta: Definições | Careplace</title>
      </Head>

      <AuthGuard>
      <AccountSettingsView />
      </AuthGuard>
    </>
  );
}
