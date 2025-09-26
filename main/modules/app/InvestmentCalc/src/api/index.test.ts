import { SetupMockApi } from '@cgp-tests/msw/handlers/app/api'
import { describe, it, server } from '@cgp-tests/utils'
import { fetchSetup } from '.'

describe('api', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-09-25T20:00:00Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should fetch successfully', async () => {
    // arrange
    server.use(SetupMockApi.handleOnSetup())

    // act
    const response = await fetchSetup()

    // assert
    expect(response).toStrictEqual({
      data: {
        values: {
          selic: 9.25,
          arca: 18,
        },
        updated_at: '25/09/2025',
      },
      error: null,
    })
  })

  it('should catch fetch error successfully', async () => {
    // arrange
    server.use(SetupMockApi.handleOnSetupError())

    // act
    const response = await fetchSetup()

    // assert
    expect(response).toStrictEqual({
      data: {
        values: {
          selic: 0,
          arca: 0,
        },
        updated_at: '-',
      },
      error: expect.objectContaining({
        title: 'Erro ao carregar configuração da calculadora.',
        message: 'Por favor, tente novamente mais tarde.',
      }),
    })
  })
})
