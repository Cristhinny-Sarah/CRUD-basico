import React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import url from '../../../../config/api';

import { ReactComponent as IconePlus } from '../../assets/plusIcon.svg'
import { ReactComponent as IconeDelete } from '../../assets/deleteIcon.svg'
import { ReactComponent as IconePincel } from '../../assets/pencilIcon.svg'

import CreateProduct from './CreateProduct';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';

export default function GetAllProducts(){
  const [_id, set_id] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCreationDate, setProductCreationDate] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [productValue, setProductValue] = useState(0);

  const [products,setProducts] = useState([]);

  const [isCriarProdutoModalOpen, setIsCriarProdutoModalOpen] = useState(false);
  const [isDeletarProdutoModalOpen, setIsDeletarProdutoModalOpen] = useState(false);
  const [isAtualizarProdutoModalOpen,setIsAtualizarProdutoModalOpen] = useState(false);

  function openCriarProdutoModal() {
    setIsCriarProdutoModalOpen(true);
    setIsDeletarProdutoModalOpen(false);
    setIsAtualizarProdutoModalOpen(false);
  }

  function openDeletarProdutoModal() {
    setIsDeletarProdutoModalOpen(true);
    setIsCriarProdutoModalOpen(false);
    setIsAtualizarProdutoModalOpen(false);
  }

  function openAtualizarProdutoModal() {
    setIsAtualizarProdutoModalOpen(true);
    setIsCriarProdutoModalOpen(false);
    setIsDeletarProdutoModalOpen(false);
  }

  useEffect(() => {
    fetch(`${url}/produtos`)
      .then((response) => {
        /* console.log(response); */
        return response.json();
      })
      .then(json => {
        setProducts(json);
        /* console.log(json); */
      })
  }, []);
  
  return(
    <div>
      <header className={styles.headerContainer}>
        <h1>Painel de Produtos</h1>
        <button onClick={openCriarProdutoModal}>
          <IconePlus />
          <p>Criar produto</p>
        </button>
      </header>

      <CreateProduct isCriarProdutoModalOpen={isCriarProdutoModalOpen} setIsCriarProdutoModalOpen={setIsCriarProdutoModalOpen} />

      <DeleteProduct isDeletarProdutoModalOpen={isDeletarProdutoModalOpen} setIsDeletarProdutoModalOpen={setIsDeletarProdutoModalOpen} productName={productName} productDescription={productDescription} productCreationDate={productCreationDate} productQuantity={productQuantity} productValue={productValue} _id={_id} />

      <UpdateProduct isAtualizarProdutoModalOpen={isAtualizarProdutoModalOpen} setIsAtualizarProdutoModalOpen={setIsAtualizarProdutoModalOpen} _id={_id} />

      <section className={styles.allProducts}>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Data do cadastro</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.nome_produto}</td>
                  <td>{product.descricao_produto}</td>
                  <td>{product.preco_produto}</td>
                  <td>{product.qtd_produto}</td>
                  <td>{format(parseISO(product.createdAt), 'd MMMM yyyy', { locale: ptBR })}</td>
                  <td>
                    <button onClick={() => {
                      set_id(product._id);

                      openAtualizarProdutoModal();
                    }}>
                      <IconePincel />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => {
                      set_id(product._id);
                      setProductName(product.nome_produto);
                      setProductDescription(product.descricao_produto);
                      setProductCreationDate(product.createdAt);
                      setProductQuantity(product.qtd_produto);
                      setProductValue(product.preco_produto);

                      openDeletarProdutoModal();
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