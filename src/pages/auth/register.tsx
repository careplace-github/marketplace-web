// next
import Head from 'next/head';
// layouts
import SimpleLayout from '../../layouts/simple';
// sections
import GuestGuard from '../../auth/GuestGuard';
import { RegisterView } from '../../views';


// ----------------------------------------------------------------------

RegisterPage.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

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
