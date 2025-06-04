import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import styles
import logo from '../../assets/images/logo.png'; // Assuming logo is in assets

function Home() {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo do Restaurante" className="home-logo" />
      <h1>Bem-vindo ao Sistema de Gestão do Restaurante</h1>
      <p>Gerencie seus pratos de forma fácil e visualize seu cardápio.</p>
      <nav className="home-nav">
        <Link to="/cadastro" className="home-link">Cadastrar Novo Prato</Link>
        <Link to="/cardapio" className="home-link">Ver Cardápio</Link>
      </nav>
    </div>
  );
}

export default Home;

