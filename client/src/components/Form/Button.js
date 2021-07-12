import React from 'react';
import styles from './button.module.css';

export default function Button({ children, type, ...props }){
  return(
    <button {...props} className={styles.button} type={type}>{children}</button>
  )
}