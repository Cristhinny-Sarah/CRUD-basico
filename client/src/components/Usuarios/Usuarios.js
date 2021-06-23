import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GetAllUsers from './GetAllUsers';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

export default function Usuarios(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<GetAllUsers />} />
        <Route path="criar" element={<CreateUser />} />
        <Route path="atualizar" element={<UpdateUser />} />
        <Route path="deletar" element={<DeleteUser />} />
      </Routes>
      
    </div>
  );
}