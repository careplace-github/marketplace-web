// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../layouts/main';
// sections
import { AccountRelativesView } from '../../views';

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
