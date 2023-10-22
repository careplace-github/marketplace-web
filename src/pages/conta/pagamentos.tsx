// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// features
import { AccountPaymentView } from 'src/features/account';
import { AuthGuard } from 'src/features/auth';

// ----------------------------------------------------------------------

AccountPaymentPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function AccountPaymentPage() {
  return (
    <>
      <Head>
        <title>Conta: Pagamentos | Careplace</title>
      </Head>

      <AuthGuard>
        <Elements stripe={stripePromise}>
          <AccountPaymentView />
        </Elements>
      </AuthGuard>
    </>
  );
}
