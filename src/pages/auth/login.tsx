// next
import Head from 'next/head';
// layouts
import SimpleLayout from 'src/layouts/simple';
// features
import { GuestGuard, LoginView } from 'src/features/auth';
 

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
