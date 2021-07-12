import React from 'react';
import styles from './input.module.css';

export default function Input({ label, type, name, value, onChange}){
  return(
    <div>
      <label htmlFor="name" className={styles.label}>{label}</label>
      <input 
        id={name} 
        name={name} 
        type={type} 
        className={styles.input} 
        value={value} 
        onChange={onChange} 
      />
    </div>
    
  )
}