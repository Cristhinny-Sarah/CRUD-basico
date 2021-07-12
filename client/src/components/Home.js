import { useEffect } from 'react';
import { ReactComponent as HomeImg } from '../assets/logo-home.svg';
import styles from './styles.module.css';

export default function Home(){
  
  useEffect(() => {
    Notification.requestPermission();
  }, []);
  
  return(
    <div className={styles.container}>
      <HomeImg className={styles.imagem} />
    </div>
  )
}