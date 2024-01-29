import Head from 'next/head'

interface IProps {
  title: string
  description?: string
}

const Seo = ({ title, description }: IProps) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Seo
