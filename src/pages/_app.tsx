import React from 'react'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { Header } from '../componentes/Header'
import { Portifolio } from '../componentes/Portifolio'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Portifolio />
    </div>
  )
}

export default MyApp
