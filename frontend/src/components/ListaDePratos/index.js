import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import axios from 'axios';
import './styles.css';

function ListaDePratos() {
  const [pratos, setPratos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();
  const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();
  const API_URL = process.env.REACT_APP_API_URL || 'https://restaurante-r6uq.onrender.com/prato';

  useEffect(() => {
    buscarPratos();
  }, []);

  const buscarPratos = async () => {
    setCarregando(true);
    try {
      const response = await axios.get(`${API_URL}/prato`);
      setPratos(response.data);
    } catch (error) {
      let erroMsg = 'Erro ao buscar pratos.';
      if (error.response && error.response.data) {
        erroMsg = error.response.data.mensagem || erroMsg;
      }
      exibirMensagem(erroMsg, 'erro');
    } finally {
      setCarregando(false);
    }
  };

  const filtrarPratos = () => {
    if (!categoriaFiltro) return pratos;
    return pratos.filter(prato => prato.categoria === categoriaFiltro);
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  return (
    <div className="lista-pratos-container">
      <div className="filtro-container">
        <label htmlFor="filtroCategoria">Filtrar por categoria:</label>
        <select
          id="filtroCategoria"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          <option value="Entrada">Entrada</option>
          <option value="Prato Principal">Prato Principal</option>
          <option value="Sobremesa">Sobremesa</option>
          <option value="Bebida">Bebida</option>
          <option value="Vegetariano">Vegetariano</option>
        </select>
      </div>

      {carregando ? (
        <div className="carregando">Carregando pratos...</div>
      ) : pratos.length === 0 ? (
        <div className="sem-pratos">
          <p>Nenhum prato cadastrado.</p>
          <button onClick={() => navigate('/cadastrar')} className="botao-cadastrar">
            Cadastrar Novo Prato
          </button>
        </div>
      ) : (
        <div className="grid-pratos">
          {filtrarPratos().map((prato) => (
            <div key={prato.id} className="card-prato">
              <div className="imagem-container">
                <img 
                  src={prato.urlImagem} 
                  alt={prato.nome} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=Imagem+Indisponível';
                  }}
                />
                <span className={`disponibilidade ${prato.disponibilidade === 'Em estoque' ? 'disponivel' : 'indisponivel'}`}>
                  {prato.disponibilidade}
                </span>
              </div>
              <div className="info-prato">
                <h3>{prato.nome}</h3>
                <p className="categoria">{prato.categoria}</p>
                <p className="descricao">{prato.descricao}</p>
                <p className="preco">{formatarPreco(prato.preco)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate('/cadastrar')} className="botao-adicionar">
        Adicionar Novo Prato
      </button>

      <MensagemFeedback
        mensagem={mensagem}
        tipo={tipoMensagem}
        visivel={visivel}
        onclose={fecharMensagem}
      />
    </div>
  );
}

export default ListaDePratos;
