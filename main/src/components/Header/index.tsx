import GrupoPrimoLogo from '@cgp-assets/images/grupo-primo-logo.png'
import Image from 'next/image'

import styles from './styles.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles['header__logo-container']}>
          <Image src={GrupoPrimoLogo} alt="Logotipo Grupo Primo" width={120} height={22} />
        </h1>
      </div>
    </header>
  )
}
