// next
import Head from 'next/head';
// layouts
import SimpleLayout from '../../layouts/simple';
// sections
import { RegisterView } from '../../views';
 

// ----------------------------------------------------------------------

RegisterBackgroundPage.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function RegisterBackgroundPage() {
  return (
    <>
      <Head>
        <title> Sign Up | Careplace </title>
      </Head>

      <RegisterView />
    </>
  );
}
