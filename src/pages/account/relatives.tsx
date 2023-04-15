// next
import Head from 'next/head';
 
// layouts
import MainLayout from 'src/layouts/main';
// features
import { AccountRelativesView } from 'src/features/account';

// ----------------------------------------------------------------------

AccountRelativestPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function AccountRelativestPage() {
  return (
    <>
      <Head>
        <title>Conta: Familiares | Careplace</title>
      </Head>

      <AccountRelativesView />
    </>
  );
}
