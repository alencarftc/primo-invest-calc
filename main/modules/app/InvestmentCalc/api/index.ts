import type { SetupResponseData } from '../models/setup'

export async function fetchSetup(): Promise<SetupResponseData> {
  const response = await fetch('http://localhost:3000/api/setup')

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return (await response.json()) as SetupResponseData
}
