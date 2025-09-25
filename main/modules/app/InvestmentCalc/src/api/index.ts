import type { SetupResponseData } from '@cgp/InvestmentCalc/types/setup'

const BASE_API_URL = process.env.BASE_API_URL

export async function fetchSetup(): Promise<SetupResponseData> {
  try {
    const response = await fetch(`${BASE_API_URL}/setup`)

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`)
    }

    const data = await response.json()

    return { data, error: null }
  } catch (err) {
    console.error('Erro ao carregar configuração:', err)

    const error = err as Error
    const errorObject = {
      title: 'Erro ao carregar configuração da calculadora.',
      message: 'Por favor, tente novamente mais tarde.',
      instance: error,
    }

    return {
      error: errorObject,
      data: {
        updated_at: '-',
        values: {
          arca: 0,
          selic: 0,
        },
      },
    }
  }
}
