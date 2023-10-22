// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// features
import GetHelpView from 'src/features/getHelp/GetHelpView';

// ----------------------------------------------------------------------

GetHelpPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function GetHelpPage() {
  return (
    <>
      <Head>
        <title>Obter ajuda gratuita | Careplace</title>
      </Head>
      <GetHelpView />
    </>
  );
}
