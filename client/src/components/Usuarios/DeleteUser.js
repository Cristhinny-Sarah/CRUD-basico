import styles from './styles.module.css';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { ReactComponent as IconeFechar } from '../../assets/close-icon.svg';

export default function DeleteUser({isDeletarUsuarioModalOpen, setIsDeletarUsuarioModalOpen, _id, userName, userEmail, userCreationDate}){
  
  async function handleSubmit(){
    await fetch(`http://localhost:5000/api/usuarios/${_id}`, {
      method: 'DELETE'
    }).then(() => {
        console.log('usuario deletado!');
        if(Notification.permission === 'granted'){
          new Notification('Usuário excluido com sucesso!');
        }
        setIsDeletarUsuarioModalOpen(false);
        window.location.reload();
    })
      .catch((e) => {
        console.log(e);
        if(Notification.permission === 'granted'){
          new Notification('Houve um problema durante a exclusão do usuário.');
        }
        setIsDeletarUsuarioModalOpen(false);
    })
  }

  return(
    <div>
      {isDeletarUsuarioModalOpen ? (
        <div className={styles.criarModal} isDeletarUsuarioModalOpen={isDeletarUsuarioModalOpen} >
          
          <h1>Deletar um usuário</h1>

          <p>Tem certeza que deseja deletar o seguinte usuário: </p>
          
          <p>Nome: {userName}</p>
          <p>Email: {userEmail}</p>
          <p>Cadastrado desde: {format(parseISO(userCreationDate), 'd MMMM yyyy', { locale: ptBR })}</p>
          
          <button className={styles.deleteButton} onClick={handleSubmit}>Deletar</button>

          <button  className={styles.criarModalCloseButton} onClick={() => {setIsDeletarUsuarioModalOpen(false)}}>
            <IconeFechar />
          </button>

        </div>
      ) : null}
    </div>
  )
}