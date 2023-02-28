import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-sliding-side-panel/lib/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
