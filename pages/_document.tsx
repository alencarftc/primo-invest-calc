import { Head, Html, Main, NextScript } from 'next/document'

export default function MyDocument() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link
          rel="preload"
          href="/assets/images/grupo-primo-logo.svg"
          as="image"
          type="image/svg+xml"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
