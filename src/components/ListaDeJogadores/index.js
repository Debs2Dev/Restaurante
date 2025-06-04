import { useState, useEffect } from 'react';
import axios from 'axios';
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import './styles.css';

function ListaDeJogadores() {
  const [jogadores, setJogadores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();

  useEffect(() => {
    const carregarJogadores = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://site-dois.onrender.com/jogador');
        setJogadores(response.data);
      } catch (error) {
        exibirMensagem('Erro ao buscar jogadores: ' + (error.message || 'Erro desconhecido'), 'erro');
        setJogadores([]);
      } finally {
        setIsLoading(false);
      }
    };

    carregarJogadores();
  }, [exibirMensagem]);

  if (isLoading) return <div className="loading">Carregando...</div>;

  return (
    <>
      <ul id="listaJogadores" className="lista-jogadores">
        {jogadores.length === 0 ? (
          <li>Nenhum jogador encontrado.</li>
        ) : (
          jogadores.map((jogador) => (
            <li key={jogador.id}>
              <strong>Nome: </strong> {jogador.nome}<br />
              <strong>Sexo: </strong> {jogador.sexo}<br />
              <strong>Idade: </strong> {jogador.idade}<br />
              <strong>Altura: </strong> {jogador.altura} m<br />
              <strong>Peso: </strong> {jogador.peso} kg<br />
              <strong>Posição: </strong> {jogador.posicao}<br />
              <strong>Número da Camisa: </strong> {jogador.numeroDaCamisa}<br />
            </li>
          ))
        )}
      </ul>

      <MensagemFeedback
        mensagem={mensagem}
        tipo={tipoMensagem}
        visivel={visivel}
        onclose={fecharMensagem}
      />
    </>
  );
}

export default ListaDeJogadores;
