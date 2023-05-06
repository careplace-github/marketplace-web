// next
import Head from 'next/head';
// layouts
import CompactLayout from 'src/layouts/compact';
// features
import { ForgotPasswordView } from 'src/features/auth';

// ----------------------------------------------------------------------

ResetPasswordPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Esqueceu-se da Password? | Careplace</title>
      </Head>

      <ForgotPasswordView />
    </>
  );
}
