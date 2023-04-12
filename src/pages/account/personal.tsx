// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../layouts/main';
// sections
import { AccountPersonalView } from '../../views';

// ----------------------------------------------------------------------

AccountPersonalPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);


// ----------------------------------------------------------------------

export default function AccountPersonalPage() {
  return (
    <>
      <Head>
        <title>Conta | Careplace</title>
      </Head>

      <AccountPersonalView />
    </>
  );
}
