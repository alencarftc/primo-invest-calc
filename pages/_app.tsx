import '@cgp-core/styles/globals.css'
import '@cgp-core/styles/normalize.css'
import '@cgp-core/styles/theme.css'
import '@cgp-core/styles/utilitary.css'
import { cx } from '@cgp-core/utils'

import type { AppProps } from 'next/app'
import { Inter, Open_Sans, Raleway } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['600'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['800'],
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={cx(inter.className, raleway.className, openSans.className)}>
      <Component {...pageProps} />
    </div>
  )
}

export default App
