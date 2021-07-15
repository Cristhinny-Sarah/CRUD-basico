import { useState } from 'react';
import styles from './styles.module.css';
import url from '../../config/api';

import { ReactComponent as IconeFechar } from '../../assets/close-icon.svg';
import Input from '../Form/Input';
import Button from '../Form/Button';

export default function CreateUser({isCriarUsuarioModalOpen, setIsCriarUsuarioModalOpen}){
  const [nome_usuario, setNome_usuario] = useState('');
  const [email_usuario, setEmail_usuario] = useState('');
  const [senha_usuario, setSenha_usuario] = useState('');
  const [tipo_usuario, setTipo_usuario] = useState(0);

  async function handleSubmit(event){
    event.preventDefault();

    const usuario = { nome_usuario, senha_usuario, email_usuario, tipo_usuario };

    await fetch(`${url}api/usuarios`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    }).then(()=>{
        /* console.log('usuario criado!'); */
        if(Notification.permission === 'granted'){
          new Notification('Usuário criado com sucesso!');
        }
        setIsCriarUsuarioModalOpen(false);
        window.location.reload();
    })
      .catch((e) => {
        console.log(e);
        if(Notification.permission === 'granted'){
          new Notification('Houve um problema durante a criação do usuário.');
        }
        setIsCriarUsuarioModalOpen(false);
      })
  }

  return(
    <div>
      {isCriarUsuarioModalOpen ? (
        <div className={styles.criarModal} isCriarUsuarioModalOpen={isCriarUsuarioModalOpen}>
          
          <h1>Criar um novo usuário</h1>
          
          <form 
            className={styles.criarModalForm} 
            onSubmit={handleSubmit}
          >
            <Input 
              label="Nome do usuário" 
              type="text" 
              name="nome_usuario" 
              value={nome_usuario}
              onChange={ (event) => setNome_usuario(event.target.value) } 
              required 
            />
            <Input 
              label="Email" 
              type="email" 
              name="email_usuario" 
              value={email_usuario}
              onChange={ (event) => setEmail_usuario(event.target.value) }  
              required 
            />
            <Input 
              label="Tipo do usuário" 
              type="number" 
              min="0" max="100" 
              name="tipo_usuario" 
              value={tipo_usuario}
              onChange={ (event) => setTipo_usuario(event.target.value) } 
            />
            <Input 
              label="Senha" 
              type="password" 
              name="senha_usuario" 
              value={senha_usuario}
              onChange={ (event) => setSenha_usuario(event.target.value) }  
              required 
            />  
            <Button>Criar</Button>
          </form>
            
          <button  className={styles.criarModalCloseButton} onClick={() => {setIsCriarUsuarioModalOpen(false)}}>
            <IconeFechar />
          </button>
          
        </div>
      ) : null }
    </div>
  )
}