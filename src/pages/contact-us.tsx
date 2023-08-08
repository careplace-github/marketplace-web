// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// features
import ContactUsView from 'src/features/contact-us/views/ContactUsView';

// ----------------------------------------------------------------------

ContactUsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ContactUsPage() {
  return (
    <>
      <Head>
        <title>Contacte-nos | Careplace </title>
      </Head>

      <ContactUsView />
    </>
  );
}
