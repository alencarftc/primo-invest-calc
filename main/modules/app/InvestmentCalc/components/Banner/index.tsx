import { cx } from '@cgp-core/utils'

import Typography from '@cgp-ds/components/Typography'
import styles from './styles.module.css'

interface BannerProps {
  title: string
  paragraph: string
}

export const Banner = ({ title, paragraph }: BannerProps) => {
  return (
    <div className={cx(styles.banner)}>
      <div className="container">
        <Typography
          as="h2"
          variant="heading"
          size="large"
          weight="extrabold"
          className={cx(styles.banner__heading, 'mb-2')}
        >
          {title}
        </Typography>
        <Typography
          as="p"
          variant="subheading"
          size="medium"
          weight="regular"
          className={cx(styles.banner__paragraph)}
        >
          {paragraph}
        </Typography>
      </div>
    </div>
  )
}
