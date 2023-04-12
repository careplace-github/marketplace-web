// next
import Head from 'next/head';
// layouts
import SimpleLayout from '../../layouts/simple';
// sections
import GuestGuard from '../../auth/GuestGuard';
import { LoginView } from '../../views';
 

// ----------------------------------------------------------------------

LoginPage.getLayout = (page: React.ReactElement) => (
  <SimpleLayout>{page}</SimpleLayout>
);

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> Login | Careplace </title>
      </Head>

      <GuestGuard>
        <LoginView />
      </GuestGuard>
  
    </>
  );
}
