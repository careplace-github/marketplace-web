// next
import Head from 'next/head';
// layouts
import CompactLayout from 'src/layouts/compact';
// features
import { ResetPasswordView } from 'src/features/auth';
 

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
