import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import url from '../../config/api';

import { ReactComponent as IconeFechar } from '../../assets/close-icon.svg';
import Input from '../Form/Input';
import Button from '../Form/Button';

export default function UpdateProduct({ isAtualizarProdutoModalOpen, setIsAtualizarProdutoModalOpen, _id }){
  const [nome_produto, setNome_produto] = useState('');
  const [descricao_produto, setDescricao_produto] = useState('');
  const [qtd_produto, setQtd_produto] = useState(0);
  const [preco_produto, setPreco_produto] = useState(0);
  
  useEffect(() => {
    (
      async () => {
        await fetch(`${url}api/produtos.details/${_id}`)
          .then((response) => {
            /* console.log(response); */
            return response.json();
          })
          .then(json => {
            setNome_produto(json.nome_produto);
            setDescricao_produto(json.descricao_produto);
            setQtd_produto(json.qtd_produto);
            setPreco_produto(json.preco_produto);
            /* console.log(json);  */
        })
    }
    )()
  }, [_id]);

  async function handleSubmit(event){
    event.preventDefault();

    const produto = { _id, nome_produto, descricao_produto, qtd_produto, preco_produto };

    await fetch(`${url}api/produtos`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    }).then(() => {
        console.log('dados atualizados!');
        if(Notification.permission === 'granted'){
          new Notification('Produto atualizado com sucesso!');
        }
        setIsAtualizarProdutoModalOpen(false);
        window.location.reload();
    })
      .catch((e) => {
        console.log(e);
        if(Notification.permission === 'granted'){
          new Notification('Houve um problema durante a atualização dos dados do produto.');
        }
        setIsAtualizarProdutoModalOpen(false);
      })
  }

  return(
    <div>
      {isAtualizarProdutoModalOpen ? (
        <div className={styles.criarModal} isAtualizarProdutoModalOpen={isAtualizarProdutoModalOpen} >
        <h1>Atualizar dados</h1>

        <form 
          className={styles.criarModalForm} 
          onSubmit={handleSubmit}
        >
          <Input
            label="Nome do produto" 
            type="text" 
            name="nome_produto" 
            value={nome_produto}
            onChange={ (event) => setNome_produto(event.target.value) }  
          />
          <Input 
            label="Descrição" 
            type="text" 
            name="descricao_produto" 
            value={descricao_produto}
            onChange={ (event) => setDescricao_produto(event.target.value) }  
          />
          <Input 
            label="Quantidade" 
            type="number"  
            name="qtd_produto" 
            value={qtd_produto}
            onChange={ (event) => setQtd_produto(event.target.value) }
          />
          <Input 
            label="Preço" 
            type="number" 
            name="preco_produto" 
            value={preco_produto}
            onChange={ (event) => setPreco_produto(event.target.value) }  
          /> 
          <Button>Salvar alterações</Button>
        </form>

        <button  className={styles.criarModalCloseButton} onClick={() => {setIsAtualizarProdutoModalOpen(false)}}>
          <IconeFechar />
        </button>
        </div>
      ) : null}
    </div>
  )
}