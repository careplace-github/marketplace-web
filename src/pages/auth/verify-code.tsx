// next
import Head from 'next/head';
 
// layouts
import CompactLayout from '../../layouts/compact';
// sections
import { VerifyCodeView } from '../../views';

// ----------------------------------------------------------------------

VerifyCodePage.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  return (
    <>
      <Head>
        <title>Verify Code | Careplace </title>
      </Head>

      <VerifyCodeView />
    </>
  );
}
