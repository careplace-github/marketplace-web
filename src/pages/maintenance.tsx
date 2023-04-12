// next
import Head from 'next/head';
// layouts
import CompactLayout from 'src/layouts/compact';
// sections
import { MaintenanceView } from '../views';

// ----------------------------------------------------------------------

MaintenancePage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Manutenção | Careplace</title>
      </Head>

      <MaintenanceView />
    </>
  );
}
