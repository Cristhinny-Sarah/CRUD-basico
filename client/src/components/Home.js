import React from 'react';
import { ReactComponent as HomeImg } from '../assets/paginaInicial.svg';
import styles from './styles.module.css';

export default function Home(){
  return(
    <div className={styles.container}>
      <h1>Home</h1>
    </div>
  )
}