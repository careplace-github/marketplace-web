import * as React from 'react';
// next
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from 'next/document';
import { AppType } from 'next/app';
// emotion
import createEmotionServer from '@emotion/server/create-instance';
// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// theme
import { primaryFont } from 'src/theme/typography';
// components
import Analytics from 'src/components/analytics';
//
import { MyAppProps } from './_app';

// ----------------------------------------------------------------------

const Favicon = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
  </>
);

const Meta = () => (
  <>
    {/* PWA primary color */}

    {/* Chrome, Firefox OS and Opera */}
    <meta name="theme-color" content="#ffffff" />
    {/* Windows Phone */}
    <meta name="msapplication-navbutton-color" content="#ffffff" />
    {/* iOS Safari */}
    <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Careplace" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="application-name" content="Careplace" />
    <meta name="msapplication-TileColor" content="#ffffff" />

    <meta name="title" content="Careplace" />
    <meta
      name="description"
      content="Careplace: Simplificando o Apoio Domiciliário. Encontrar e contratar cuidadores domiciliários nunca foi tão fácil. Na Careplace, conectamos pessoas a profissionais de apoio domiciliário e Empresas de Apoio Domiciliário de forma rápida, segura e sem burocracias. Através da Careplace poderá encontrar um cuidador domiciliário para o seu familiar! Além disso, oferecemos disponibilizamos também aluger de equipamentos médicos, incluindo camas articuladas, gruas de transferência, cadeiras de rodas e muito mais. O futuro do apoio ao domicílio e geriatria está a um clique de distância com a Careplace. Registe-se gratuitamente em www.careplace.pt e transforme a maneira como cuidamos dos nossos entes queridos."
    />
    <meta
      name="keywords"
      content="careplace,careplace.pt,www.careplace.pt,apoio domiciliário,apoio ao domicílio,cuidadores domiciliários,cuidadores,empresas sad,empresas de apoio domiciliário,empresas de apoio ao domicílio,empresas de cuidados domiciliários,empresas de cuidados ao domicílio,empresas de apoio domiciliário lisboa,empresas de apoio domiciliário porto,empresas de apoio domiciliário coimbra,empresas de apoio domiciliário braga,empresas de apoio domiciliário aveiro,empresas de apoio domiciliário faro,empresas de apoio domiciliário algarve,empresas de apoio domiciliário madeira,empresas de apoio domiciliário açores,empresas de apoio domiciliário viseu,empresas de apoio domiciliário leiria,empresas de apoio domiciliário santarém,empresas de apoio domiciliário évora,empresas de apoio domiciliário setúbal,empresas de apoio domiciliário beja,empresas de apoio domiciliário castelo branco,empresas de apoio domiciliário guarda,empresas de apoio domiciliário vila real,empresas de apoio domiciliário bragança,empresas de apoio domiciliário portalegre, geriatria"
    />
    <meta name="author" content="Careplace" />
  </>
);

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="pt" className={primaryFont.className}>
      <Head>
        <Favicon />
        <Meta />
        {/* Emotion */}
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* 
          We are using the analytics component on the _document.tsx file to reduce potential redundancy and improving page load times.
          By including the analytics component on the _document.tsx file, we are ensuring that the analytics component is only loaded once for the entire application as it will be included on every page on the HTML document.
        */}
        <Analytics />
      </body>
    </Html>
  );
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
