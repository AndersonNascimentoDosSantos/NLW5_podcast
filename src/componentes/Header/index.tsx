import React from 'react'
import style from './styles.module.scss'
import Link from 'next/link';
export function Header() {
  

  return (
    <header className={style.headerContainer}>
      <Link href='/'>

     <a>
      <img src="/logo.svg" alt="podcastr"  />
      </a>
      </Link>
      <p>PROATIVA AUTOMAÇÃO E SISTEMAS LTDA.</p>
      <span>
        
        
        <Link href='/contato'>
        
        <a>
          CONTATO
        </a></Link>
      
      
      </span>
    </header>
  )
}
