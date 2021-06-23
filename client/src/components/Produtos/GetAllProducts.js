import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ReactComponent as IconePlus } from '../../assets/plusIcon.svg'
import { ReactComponent as IconeDelete } from '../../assets/deleteIcon.svg'
import { ReactComponent as IconePincel } from '../../assets/pencilIcon.svg'

export default function GetAllProducts(){
  const [products,setProducts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/produtos')
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then(json => {
        setProducts(json);
        console.log(json);
      })
  }, []);
  
  return(
    <div>
      <header className={styles.headerContainer}>
        <h1>Painel de Produtos</h1>
        <button>
          <IconePlus />
          <Link className={styles.link} to="/produtos/criar">Criar produto</Link>
        </button>
      </header>

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
                    <button>
                      <Link to="/produtos/atualizar">
                        <IconePincel />
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button>
                      <Link to="/produtos/deletar">
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