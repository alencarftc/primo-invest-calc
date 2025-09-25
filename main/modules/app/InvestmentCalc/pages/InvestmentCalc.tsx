import type { InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { fetchSetup } from '../api'
import { InvestmentCalc } from '../containers/InvestmentCalc'

export async function getServerSideProps() {
  const { data } = await fetchSetup()

  return { props: { data } }
}

type InvestmentCalcPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const InvestmentCalcPage: NextPage<InvestmentCalcPageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/logo-arca.svg" as="image" type="image/svg+xml" />
      </Head>
      <InvestmentCalc data={data} />
    </>
  )
}

export default InvestmentCalcPage
