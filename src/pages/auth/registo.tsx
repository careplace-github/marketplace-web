// next
import Head from 'next/head';
// layouts
import SimpleLayout from 'src/layouts/simple';
// features
import { GuestGuard, RegisterView } from 'src/features/auth';

// ----------------------------------------------------------------------

RegisterPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title> Registar | Careplace </title>
      </Head>

      <GuestGuard>
        <RegisterView />
      </GuestGuard>
    </>
  );
}
