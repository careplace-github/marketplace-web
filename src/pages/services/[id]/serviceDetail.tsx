// next
import Head from 'next/head';
 
// layouts
import MainLayout from '../../../layouts/main';
// sections
import { ServiceDetailView } from '../../../views';

// ----------------------------------------------------------------------

MarketingCaseStudyPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function MarketingCaseStudyPage() {
  return (
    <>
      <Head>
        <title>Bank of America - Case Study | Careplace</title>
      </Head>

      <ServiceDetailView />
    </>
  );
}
