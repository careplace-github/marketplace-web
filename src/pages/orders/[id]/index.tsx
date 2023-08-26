// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// features
import OrderView from 'src/features/orders/views/OrderView';
import { AuthGuard } from 'src/features/auth';

// ----------------------------------------------------------------------

CheckoutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Pedido | Careplace</title>
      </Head>
      <AuthGuard>
        <OrderView />
      </AuthGuard>
    </>
  );
}
