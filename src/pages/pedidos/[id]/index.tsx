// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// features
import OrderView from 'src/features/orders/views/OrderView';
import { AuthGuard } from 'src/features/auth';

// ----------------------------------------------------------------------

CheckoutPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Pedido | Careplace</title>
      </Head>
      <AuthGuard>
        <Elements stripe={stripePromise}>
          <OrderView />
        </Elements>
      </AuthGuard>
    </>
  );
}
