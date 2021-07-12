import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GetAllUsers from './GetAllUsers';

export default function Usuarios(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<GetAllUsers />} />
      </Routes>
    </div>
  );
}