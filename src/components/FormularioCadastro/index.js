import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import './styles.css';

function FormularioCadastro() {
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [idade, setIdade] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [posicao, setPosicao] = useState('');
  const [numeroDaCamisa, setNumeroDaCamisa] = useState('');
  const navigate = useNavigate();
  const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();

  const cadastrarJogador = async () => {
    if (!nome.trim()) {
      exibirMensagem('O nome é obrigatório.', 'erro');
      return;
    }
    if (!sexo) {
      exibirMensagem('O sexo deve ser selecionado.', 'erro');
      return;
    }
    if (isNaN(idade) || Number(idade) <= 0) {
      exibirMensagem('A idade deve ser um número positivo.', 'erro');
      return;
    }
    if (isNaN(altura) || Number(altura) <= 0) {
      exibirMensagem('A altura deve ser um número positivo.', 'erro');
      return;
    }
    if (isNaN(peso) || Number(peso) <= 0) {
      exibirMensagem('O peso deve ser um número positivo.', 'erro');
      return;
    }
    if (!posicao) {
      exibirMensagem('A posição deve ser selecionada.', 'erro');
      return;
    }
    if (isNaN(numeroDaCamisa) || Number(numeroDaCamisa) <= 0) {
      exibirMensagem('O número da camisa deve ser um número positivo.', 'erro');
      return;
    }

    try {
      const response = await axios.post('https://site-dois.onrender.com/jogador', {
        nome,
        sexo,
        idade: Number(idade),
        altura: Number(altura),
        peso: Number(peso),
        posicao,
        numeroDaCamisa: Number(numeroDaCamisa),
      });

      exibirMensagem(response.data.mensagem || 'Jogador cadastrado com sucesso!', 'sucesso');

      setNome('');
      setSexo('');
      setIdade('');
      setAltura('');
      setPeso('');
      setPosicao('');
      setNumeroDaCamisa('');
    } catch (error) {
      let erroMsg = 'Erro ao conectar ao servidor.';
      if (error.response && error.response.data) {
        erroMsg = error.response.data.mensagem || erroMsg;
        if (error.response.data.erros) {
          erroMsg += ' ' + Object.values(error.response.data.erros).join(', ');
        }
      }
      exibirMensagem(erroMsg, 'erro');
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo da empresa" />
      <h2>Cadastro de Jogadores</h2>
      <form onSubmit={(e) => { e.preventDefault(); cadastrarJogador(); }}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label htmlFor="sexo">Sexo</label>
        <select
          id="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          required
        >
          <option value="">Selecione o sexo</option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMININO">Feminino</option>
        </select>
        <label htmlFor="idade">Idade</label>
        <input
          type="number"
          id="idade"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          min="1"
          required
        />
        <label htmlFor="altura">Altura (m)</label>
        <input
          type="number"
          id="altura"
          placeholder="Altura"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          step="0.01"
          min="0.01"
          required
        />
        <label htmlFor="peso">Peso (kg)</label>
        <input
          type="number"
          id="peso"
          placeholder="Peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          step="0.1"
          min="0.1"
          required
        />
        <label htmlFor="posicao">Posição</label>
        <select
          id="posicao"
          value={posicao}
          onChange={(e) => setPosicao(e.target.value)}
          required
        >
          <option value="">Selecione a posição</option>
          <option value="Goleiro">Goleiro</option>
          <option value="Zagueiro">Zagueiro</option>
          <option value="Meio-campista">Meio-campista</option>
          <option value="Atacante">Atacante</option>
        </select>
        <label htmlFor="numeroDaCamisa">Número da Camisa</label>
        <input
          type="number"
          id="numeroDaCamisa"
          placeholder="Número da Camisa"
          value={numeroDaCamisa}
          onChange={(e) => setNumeroDaCamisa(e.target.value)}
          min="1"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      <button onClick={() => navigate('/listar-jogadores')} className="link-jogadores">
        Ver Jogadores Cadastrados
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

export default FormularioCadastro;
