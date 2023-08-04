import { Head, Html, Main, NextScript } from 'next/document';

import { jost } from '@/theme/fonts';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={` ${jost.className}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
