import Image from 'next/image'

import styles from './styles.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles['header__logo-container']}>
          <Image
            className={styles.header__logo}
            src="/assets/images/grupo-primo-logo.svg"
            alt="Logotipo Grupo Primo"
            width={176}
            height={32}
            unoptimized
          />
        </h1>
      </div>
    </header>
  )
}
