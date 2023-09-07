// next
import Head from 'next/head';
// react
import { useEffect } from 'react';
// router
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import SupportView from 'src/features/common/views/SupportView';

// ----------------------------------------------------------------------

SupportPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function SupportPage() {
  const rediretToComingSoon = true;
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && rediretToComingSoon) {
      router.push(PATHS.comingsoon);
    }
  }, [router.isReady]);

  return rediretToComingSoon ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  ) : (
    <>
      <Head>
        <title>Suporte | Careplace</title>
      </Head>

      <SupportView />
    </>
  );
}
