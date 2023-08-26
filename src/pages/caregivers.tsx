// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// features
import CaregiversView from 'src/features/caregivers/views/CaregiversView';

// ----------------------------------------------------------------------

RegisterCaregiverPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function RegisterCaregiverPage() {
  return (
    <>
      <Head>
        <title>Registe-se como Cuidador | Careplace </title>
      </Head>

      <CaregiversView />
    </>
  );
}
