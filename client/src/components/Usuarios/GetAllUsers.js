import React from 'react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { ReactComponent as IconePlus } from '../../assets/plusIcon.svg';
import { ReactComponent as IconeDelete } from '../../assets/deleteIcon.svg';
import { ReactComponent as IconePincel } from '../../assets/pencilIcon.svg';

import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';

export default function GetAllUsers(){
  const [_id, set_id] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCreationDate, setUserCreationDate] = useState('');
  
  const [users,setUsers] = useState([]);
  
  const [isCriarUsuarioModalOpen, setIsCriarUsuarioModalOpen] = useState(false);
  const [isDeletarUsuarioModalOpen, setIsDeletarUsuarioModalOpen] = useState(false);
  const [isAtualizarUsuarioModalOpen,setIsAtualizarUsuarioModalOpen] = useState(false);
  
  function openCriarUsuarioModal() {
    setIsCriarUsuarioModalOpen(true);
    setIsDeletarUsuarioModalOpen(false);
    setIsAtualizarUsuarioModalOpen(false);
  }

  function openDeletarUsuarioModal() {
    setIsDeletarUsuarioModalOpen(true);
    setIsAtualizarUsuarioModalOpen(false);
    setIsCriarUsuarioModalOpen(false);
  }

  function openAtualizarUsuarioModal() {
    setIsAtualizarUsuarioModalOpen(true);
    setIsDeletarUsuarioModalOpen(false);
    setIsCriarUsuarioModalOpen(false);
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/usuarios')
      .then((response) => {
        /* console.log(response); */
        return response.json();
      })
      .then(json => {
        setUsers(json);
        /* console.log(json); */
      })
  }, []);
  
  return(
    <div>
      <header className={styles.headerContainer}>
        <h1>Painel de Usuários</h1>
        <button onClick={openCriarUsuarioModal}>
          <IconePlus />
          <p>Criar usuário</p>
        </button>
      </header>

      <CreateUser isCriarUsuarioModalOpen={isCriarUsuarioModalOpen} setIsCriarUsuarioModalOpen={setIsCriarUsuarioModalOpen} />

      <DeleteUser isDeletarUsuarioModalOpen={isDeletarUsuarioModalOpen} setIsDeletarUsuarioModalOpen={setIsDeletarUsuarioModalOpen} _id={_id} userName={userName} userEmail={userEmail} userCreationDate={userCreationDate} />

      <UpdateUser isAtualizarUsuarioModalOpen={isAtualizarUsuarioModalOpen} setIsAtualizarUsuarioModalOpen={setIsAtualizarUsuarioModalOpen} _id={_id} />

      <section className={styles.allUsers}>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo de usuário</th>
              <th>Data do cadastro</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.nome_usuario}</td>
                  <td>{user.email_usuario}</td>
                  <td>{user.tipo_usuario}</td>
                  <td>{format(parseISO(user.createdAt), 'd MMMM yyyy', { locale: ptBR })}</td>
                  <td>
                    <button onClick={() => {
                      set_id(user._id);
                      
                      openAtualizarUsuarioModal();
                    }}>
                      <IconePincel />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => {
                      set_id(user._id);
                      setUserName(user.nome_usuario);
                      setUserEmail(user.email_usuario);
                      setUserCreationDate(user.createdAt);
                      
                      openDeletarUsuarioModal();
                    }}>
                      <IconeDelete />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}