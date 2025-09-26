import Typography from '@cgp-ds/src/components/Typography'
import type { SetupResponseData } from '@cgp/InvestmentCalc/types/setup'

type ErrorBannerProps = {
  error: SetupResponseData['error']
}

export const ErrorBanner = ({ error }: ErrorBannerProps) => {
  if (!error) return null

  return (
    <div>
      <Typography as="h2" variant="heading" size="large" weight="extrabold" className="mb-2">
        {error.title}
      </Typography>
      <Typography size="medium" variant="subheading" weight="regular">
        {error.message}
      </Typography>
    </div>
  )
}
