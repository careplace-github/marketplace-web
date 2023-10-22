import React, { useEffect } from 'react';
// routes
import { useRouter } from 'next/router';
import { PATHS } from 'src/routes';
// components
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

function index() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) router.push(PATHS.search.homeCare.companies.root);
  }, [router.isReady]);

  return <LoadingScreen />;
}

export default index;
