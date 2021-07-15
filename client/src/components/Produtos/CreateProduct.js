import { useState } from 'react';
import styles from './styles.module.css';
import url from '../../config/api';

import { ReactComponent as IconeFechar } from '../../assets/close-icon.svg';
import Input from '../Form/Input';
import Button from '../Form/Button';

export default function CreateProduct({isCriarProdutoModalOpen, setIsCriarProdutoModalOpen}){
  const [nome_produto, setNome_produto] = useState('');
  const [descricao_produto, setDescricao_produto] = useState('');
  const [preco_produto, setPreco_produto] = useState(0);
  const [qtd_produto, setQtd_produto] = useState(0);

  async function handleSubmit(event){
    event.preventDefault();

    const produto = { nome_produto, descricao_produto, preco_produto, qtd_produto };

    await fetch(`${url}api/produtos`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    }).then(()=>{
        /* console.log('produto criado!'); */
        if(Notification.permission === 'granted'){
          new Notification('Produto criado com sucesso!');
        }
        setIsCriarProdutoModalOpen(false);
        window.location.reload();
    })
      .catch((e) => {
        console.log(e);
        if(Notification.permission === 'granted'){
          new Notification('Houve um problema durante o cadastro do produto.');
        }
        setIsCriarProdutoModalOpen(false);
      })
  }

  return(
    <div>
      {isCriarProdutoModalOpen ? (
        <div className={styles.criarModal} isCriarProdutoModalOpen={isCriarProdutoModalOpen}>
          
          <h1>Cadastrar um novo produto</h1>
          
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
              required 
            />
            <Input 
              label="Descrição" 
              type="text" 
              name="descricao_produto" 
              value={descricao_produto}
              onChange={ (event) => setDescricao_produto(event.target.value) }  
              required 
            />
            <Input 
              label="Quantidade" 
              type="number"  
              name="qtd_produto" 
              value={qtd_produto}
              onChange={ (event) => setQtd_produto(event.target.value) }
              required 
            />
            <Input 
              label="Preço" 
              type="number" 
              name="preco_produto" 
              value={preco_produto}
              onChange={ (event) => setPreco_produto(event.target.value) }  
              required 
            />  
            <Button>Criar</Button>
          </form>
            
          <button  className={styles.criarModalCloseButton} onClick={() => {setIsCriarProdutoModalOpen(false)}}>
            <IconeFechar />
          </button>
          
        </div>
      ) : null }
    </div>
  )
}