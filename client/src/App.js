import './styles/global.css';
import MenuLateral from './components/MenuLateral';
import Footer from './components/Footer';
import Home from './components/Home.js';
import Usuarios from './components/Usuarios/Usuarios.js'
import Produtos from './components/Produtos/Produtos.js'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <MenuLateral />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios/*" element={<Usuarios />} />
          <Route path="/produtos/*" element={<Produtos />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
