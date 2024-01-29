import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import LayoutApp from '../components/Layout/LayoutApp'
import LayoutEmpty from '../components/Layout/LayoutEmpty'
import LayoutPublic from '../components/Layout/LayoutPublic'
import LayoutTenant from '../components/Layout/LayoutTenant'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()
  const { pathname } = router
  let Layout = LayoutPublic

  if (pathname.indexOf('/app') === 0) {
    Layout = LayoutApp
  }
  if (pathname.indexOf('/[slug]') === 0) {
    Layout = LayoutTenant
  }
  if (pathname === '/app') {
    Layout = LayoutEmpty
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
