// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// features
import ReviewPageView from 'src/features/companies/views/ReviewPageView';

// ----------------------------------------------------------------------

CheckoutSuccessPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CheckoutSuccessPage() {
  return (
    <>
      <Head>
        <title>Avaliação de Empresa | Careplace</title>
      </Head>

      <ReviewPageView />
    </>
  );
}
