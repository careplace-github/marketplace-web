// next
import Head from 'next/head';
// layouts
import CompactLayout from '../../layouts/compact';
// sections
import { ResetPasswordView } from '../../views';
 

// ----------------------------------------------------------------------

ResetPasswordPage.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Repor Password | Careplace</title>
      </Head>

      <ResetPasswordView />
    </>
  );
}
