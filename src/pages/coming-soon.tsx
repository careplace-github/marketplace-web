// next
import Head from 'next/head';
// layouts
import CompactLayout from 'src/layouts/compact';
// sections
import { ComingSoonView } from '../views';

// ----------------------------------------------------------------------

ComingSoonPage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ComingSoonPage() {
  return (
    <>
      <Head>
        <title>Brevemente... | Careplace</title>
      </Head>

      <ComingSoonView />
    </>
  );
}
