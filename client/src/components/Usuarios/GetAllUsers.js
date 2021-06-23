import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ReactComponent as IconePlus } from '../../assets/plusIcon.svg'
import { ReactComponent as IconeDelete } from '../../assets/deleteIcon.svg'
import { ReactComponent as IconePincel } from '../../assets/pencilIcon.svg'

export default function GetAllUsers(){
  const [users,setUsers] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/usuarios')
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then(json => {
        setUsers(json);
        console.log(json);
      })
  }, []);
  
  return(
    <div>
      <header className={styles.headerContainer}>
        <h1>Painel de Usuários</h1>
        <button>
          <IconePlus />
          <Link className={styles.link} to="/usuarios/criar">Criar usuário</Link>
        </button>
      </header>

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
                  <td >{user._id}</td>
                  <td>{user.nome_usuario}</td>
                  <td>{user.email_usuario}</td>
                  <td>{user.tipo_usuario}</td>
                  <td>{format(parseISO(user.createdAt), 'd MMMM yyyy', { locale: ptBR })}</td>
                  <td>
                    <button>
                      <Link to="/usuarios/atualizar">
                        <IconePincel />
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button>
                      <Link to="/usuarios/deletar">
                        <IconeDelete />
                      </Link>
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