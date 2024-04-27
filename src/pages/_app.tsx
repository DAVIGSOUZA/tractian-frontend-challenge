import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Panel } from '@/components/Panel'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Header />
      <Panel>
        <Component {...pageProps} />
      </Panel>
    </main>
  )
}
