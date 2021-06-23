import React from 'react';
import styles from './styles.module.css'
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo-empresa.svg'
import { ReactComponent as IconeProduto } from '../../assets/clipboard.svg'
import { ReactComponent as IconeUsuario } from '../../assets/user.svg'

export default function MenuLateral(){
  return(
    <header className={styles.container}>
      <nav>
        <Link className={styles.homeContainer} to="/">
          <Logo />
        </Link>
        <Link className={styles.produtoContainer} to="/produtos">
          <IconeProduto className={styles.imagens} />
          Produtos
        </Link>
        <Link className={styles.usuarioContainer} to="/usuarios">
          <IconeUsuario className={styles.imagens} />  
          Usuários
        </Link>
      </nav>
    </header>
  )
}