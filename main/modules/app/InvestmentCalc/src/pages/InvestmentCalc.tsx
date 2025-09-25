import type { InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import { fetchSetup } from '../api'
import { InvestmentCalc } from '../containers/InvestmentCalc'

export async function getServerSideProps() {
  const response = await fetchSetup()

  return { props: JSON.parse(JSON.stringify(response)) }
}

type InvestmentCalcPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const InvestmentCalcPage: NextPage<InvestmentCalcPageProps> = ({ data, error }) => {
  return (
    <>
      <Head>
        <link rel="preload" href="/assets/images/logo-arca.svg" as="image" type="image/svg+xml" />
      </Head>
      <InvestmentCalc data={data} error={error} />
    </>
  )
}

export default InvestmentCalcPage
