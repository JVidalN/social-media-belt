import type { NextPage } from 'next'
import Link from 'next/link'
import Seo from 'components/Seo'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div>
      <Seo title="Social Media Belt" description="Social Media Belt" />
      <ul>
        <li>
          <Link href="/app">App</Link>
        </li>
        <li>
          <Link href="/devpleno">Tenant devpleno</Link>
        </li>
      </ul>
      <p>
        <button onClick={() => signIn()}>Sign in</button>
      </p>
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    </div>
  )
}

export default Home
