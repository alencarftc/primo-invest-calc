import type { SetupResponseData } from '@cgp/InvestmentCalc/types/setup'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SetupResponseData['data']>,
) {
  if (req.method !== 'GET') {
    return res.status(404)
  }

  return res.status(200).json({
    values: {
      selic: 9.25,
      arca: 18,
    },
    updated_at: new Date().toLocaleDateString('pt-BR'),
  })
}
