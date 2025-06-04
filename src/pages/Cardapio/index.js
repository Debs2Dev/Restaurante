import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import styles

function Cardapio() {
  const [pratos, setPratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPratos = async () => {
      setLoading(true);
      setErro('');
      try {
        // Adjust URL if backend is running elsewhere
        const response = await axios.get('http://localhost:8080/api/pratos');
        setPratos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
        setErro('Não foi possível carregar o cardápio. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPratos();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="cardapio-container">
      <h2>Nosso Cardápio</h2>
      {loading && <p>Carregando cardápio...</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}
      {!loading && !erro && (
        <div className="cardapio-grid">
          {pratos.length === 0 ? (
            <p>Nenhum prato cadastrado ainda.</p>
          ) : (
            pratos.map((prato) => (
              <div key={prato.id} className="prato-card">
                <img src={prato.urlImagem} alt={prato.nomePrato} className="prato-imagem" />
                <div className="prato-info">
                  <h3 className="prato-nome">{prato.nomePrato}</h3>
                  {/* Optional: Display description */}
                  {/* <p className="prato-descricao">{prato.descricao}</p> */}
                  <p className="prato-preco">R$ {prato.preco.toFixed(2)}</p>
                  {/* Optional: Display category and availability */}
                  {/* <p className="prato-categoria">Categoria: {prato.categoria}</p> */}
                  {/* <p className="prato-disponibilidade">{prato.disponibilidade}</p> */}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Cardapio;

