import { Link } from 'react-router-dom';
import './styles.css';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/cadastrar">Cadastrar</Link>
      <Link to="/listar-jogadores">Lista de Jogadores</Link>
    </nav>
  );
}

export default NavBar;