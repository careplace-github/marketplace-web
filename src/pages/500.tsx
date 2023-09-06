// next
import Head from 'next/head';
// react
import React from 'react';
// layouts
import CompactLayout from 'src/layouts/compact';
// features
import { Error500View } from 'src/features/common';

// ----------------------------------------------------------------------

Page500.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <>
      <Head>
        <title>500 Erro de Servidor | Careplace</title>
      </Head>

      <Error500View />
    </>
  );
}
