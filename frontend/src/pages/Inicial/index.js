import logo from '../../assets/images/logo.png';
import './styles.css';

function PaginaInicial() {return (
    <div className="pagina-inicial">
      <div className="container">
        <img className='logo' src={logo} alt="Logo do restaurante" />
        <h2>Página Inicial</h2>
        <p>Bem-vindo ao seu Sistema de Gestão de Restaurantes!</p>
      </div>
    </div>
  );
}

export default PaginaInicial;