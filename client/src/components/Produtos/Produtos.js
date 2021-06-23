import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GetAllProducts from './GetAllProducts';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateUser';
import DeleteProduct from './DeleteUser';

export default function Usuarios(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<GetAllProducts />} />
        <Route path="criar" element={<CreateProduct />} />
        <Route path="atualizar" element={<UpdateProduct />} />
        <Route path="deletar" element={<DeleteProduct />} />
      </Routes>
      
    </div>
  );
}