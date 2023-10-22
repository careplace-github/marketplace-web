// next
import Head from 'next/head';

// layouts
import CompactLayout from 'src/layouts/compact';
// features
import { VerifyCodeView } from 'src/features/auth';

// ----------------------------------------------------------------------

VerifyCodePage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  return (
    <>
      <Head>
        <title>Verificar Código | Careplace </title>
      </Head>

      <VerifyCodeView />
    </>
  );
}
