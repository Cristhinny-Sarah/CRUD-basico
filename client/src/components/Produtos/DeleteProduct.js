import styles from './styles.module.css';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import url from '../../config/api';

import { ReactComponent as IconeFechar } from '../../assets/close-icon.svg';

export default function DeleteProduct({isDeletarProdutoModalOpen, setIsDeletarProdutoModalOpen, _id, productName, productDescription, productQuantity, productValue, productCreationDate}){
  
  async function handleSubmit(){
    await fetch(`${url}api/produtos/${_id}`, {
      method: 'DELETE'
    }).then(() => {
        /* console.log('produto deletado!'); */
        if(Notification.permission === 'granted'){
          new Notification('Produto excluido com sucesso!');
        }
        setIsDeletarProdutoModalOpen(false);
        window.location.reload();
    })
      .catch((e) => {
        console.log(e);
        if(Notification.permission === 'granted'){
          new Notification('Houve um problema durante a exclusão do produto.');
        }
        setIsDeletarProdutoModalOpen(false);
    })
  }
  
  return(
    <div>
      {isDeletarProdutoModalOpen ? (
        <div className={styles.criarModal} isDeletarProdutoModalOpen={isDeletarProdutoModalOpen} >
            
          <h1>Deletar um produto</h1>

          <p>Tem certeza que deseja deletar o seguinte produto: </p>
          
          <p>Nome: {productName}</p>
          <p>Descrição: {productDescription}</p>
          <p>Quantidade: {productQuantity}</p>
          <p>Valor: {productValue}</p>
          <p>Cadastrado desde: {format(parseISO(productCreationDate), 'd MMMM yyyy', { locale: ptBR })}</p>
          
          <button className={styles.deleteButton} onClick={handleSubmit}>Deletar</button>

          <button  className={styles.criarModalCloseButton} onClick={() => {setIsDeletarProdutoModalOpen(false)}}>
            <IconeFechar />
          </button>

        </div>
    ) : null}
    </div>
    
  )
}