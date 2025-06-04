import ListaDeJogadores from '../../components/ListaDeJogadores';
import './styles.css';

function PaginaListaJogadores() {
  return (
    <div className="pagina-lista-jogadores">
      <div className="container">
        <h2>Lista de Jogadores</h2>
        <ListaDeJogadores />
      </div>
    </div>
  );
}

export default PaginaListaJogadores;