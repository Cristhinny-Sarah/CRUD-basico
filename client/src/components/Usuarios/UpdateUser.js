import { useState, useEffect } from 'react';
import styles from './styles.module.css';

import { ReactComponent as IconeFechar } from '../../assets/close-icon.svg';
import Input from '../Form/Input';
import Button from '../Form/Button';

export default function UpdateUser({isAtualizarUsuarioModalOpen, setIsAtualizarUsuarioModalOpen, _id}){
  const [nome_usuario, setNome_usuario] = useState('');
  const [email_usuario, setEmail_usuario] = useState('');
  const [senha_usuario, setSenha_usuario] = useState('');
  const [tipo_usuario, setTipo_usuario] = useState(0);

  useEffect(() => {
    (
      async () => {
        await fetch(`http://localhost:5000/api/usuarios.details/${_id}`)
          .then((response) => {
            /* console.log(response); */
            return response.json();
          })
          .then(json => {
            setNome_usuario(json.nome_usuario);
            setEmail_usuario(json.email_usuario);
            setSenha_usuario(json.senha_usuario);
            setTipo_usuario(json.tipo_usuario);
            /* console.log(json);  */
        })
    }
    )()
  }, [_id]);

  async function handleSubmit(event){
    event.preventDefault();

    const usuario = { _id, nome_usuario, senha_usuario, email_usuario, tipo_usuario };

    await fetch('http://localhost:5000/api/usuarios', { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    }).then(()=>{
        console.log('dados atualizados!');
        if(Notification.permission === 'granted'){
          new Notification('Usuário atualizado com sucesso!');
        }
        setIsAtualizarUsuarioModalOpen(false);
        window.location.reload();
    })
      .catch((e) => {
        console.log(e);
        if(Notification.permission === 'granted'){
          new Notification('Houve um problema durante a atualização dos dados do usuário.');
        }
        setIsAtualizarUsuarioModalOpen(false);
      })
  }
  
  return(
    <div>
      {isAtualizarUsuarioModalOpen ? (
        <div className={styles.criarModal} isAtualizarUsuarioModalOpen={isAtualizarUsuarioModalOpen} >
          
        <h1>Atualizar dados</h1>

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
          />
          <Input 
              label="Email" 
              type="email" 
              name="email_usuario" 
              value={email_usuario}
              onChange={ (event) => setEmail_usuario(event.target.value) }
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
            /> 
          <Button>Salvar alterações</Button>
        </form>

        <button  className={styles.criarModalCloseButton} onClick={() => {setIsAtualizarUsuarioModalOpen(false)}}>
          <IconeFechar />
        </button>
        </div>
      ) : null}
    </div>
  )
}