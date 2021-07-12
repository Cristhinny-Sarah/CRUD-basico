import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GetAllProducts from './GetAllProducts';

export default function Produtos(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<GetAllProducts />} />
      </Routes>
    </div>
  );
}