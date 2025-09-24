import { cx } from '@cgp-core/utils'

import styles from './styles.module.css'

interface BannerProps {
  title: string
  paragraph: string
}

export const Banner = ({ title, paragraph }: BannerProps) => {
  return (
    <div className={cx(styles.banner)}>
      <div className="container">
        <h2 className={cx(styles.banner__heading, 'mb-2')}>{title}</h2>
        <p className={styles.banner__paragraph}>{paragraph}</p>
      </div>
    </div>
  )
}
