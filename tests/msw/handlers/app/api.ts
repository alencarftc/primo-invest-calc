import { rest } from 'msw'

const BASE_API_URL = process.env.BASE_API_URL

const handleOnSetup = () =>
  rest.get(`${BASE_API_URL}/setup`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        values: {
          selic: 9.25,
          arca: 18,
        },
        updated_at: new Date().toLocaleDateString('pt-BR'),
      }),
    )
  })

const handleOnSetupError = () =>
  rest.get(`${BASE_API_URL}/setup`, (_, res, ctx) => {
    return res(ctx.status(500))
  })

export const SetupMockApi = {
  handleOnSetup,
  handleOnSetupError,
} as const
