import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import './styles.css';

function FormularioCadastroPrato() {
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const navigate = useNavigate();
  const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();
  const API_URL = process.env.REACT_APP_API_URL || 'https://restaurante-r6uq.onrender.com/prato';

  const cadastrarPrato = async () => {
    if (!nomePrato.trim()) {
      exibirMensagem('O nome do prato é obrigatório.', 'erro');
      return;
    }
    if (!descricao.trim()) {
      exibirMensagem('A descrição é obrigatória.', 'erro');
      return;
    }
    if (isNaN(preco) || preco <= 0) {
      exibirMensagem('O preço deve ser um número positivo.', 'erro');
      return;
    }
    if (!categoria) {
      exibirMensagem('A categoria deve ser selecionada.', 'erro');
      return;
    }
    if (!disponibilidade) {
      exibirMensagem('A disponibilidade deve ser selecionada.', 'erro');
      return;
    }
    if (!urlImagem.trim()) {
      exibirMensagem('A URL da imagem do prato é obrigatória.', 'erro');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/prato`, {
        nome: nomePrato,
        descricao,
        preco: Number(preco),
        categoria,
        disponibilidade,
        urlImagem,
      });
      exibirMensagem(response.data.mensagem || 'Prato cadastrado com sucesso!', 'sucesso');
      setNomePrato('');
      setDescricao('');
      setPreco('');
      setCategoria('');
      setDisponibilidade('');
      setUrlImagem('');
    } catch (error) {
      let erroMsg = 'Erro ao conectar ao servidor.';
      if (error.response && error.response.data) {
        erroMsg = error.response.data.mensagem;
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
      <h2>Cadastro de Prato</h2>
      <form onSubmit={(e) => { e.preventDefault(); cadastrarPrato(); }}>
        <label htmlFor="nomePrato">Nome do Prato</label>
        <input
          type="text"
          id="nomePrato"
          placeholder="Nome do Prato"
          value={nomePrato}
          onChange={(e) => setNomePrato(e.target.value)}
          required
        />
        
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          placeholder="Descrição do prato"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <label htmlFor="preco">Preço (R$)</label>
        <input
          type="number"
          id="preco"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          step="0.01"
          min="0"
          required
        />

        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">Selecione a categoria</option>
          <option value="Entrada">Entrada</option>
          <option value="Prato Principal">Prato Principal</option>
          <option value="Sobremesa">Sobremesa</option>
          <option value="Bebida">Bebida</option>
        </select>

        <label htmlFor="disponibilidade">Disponibilidade</label>
        <select
          id="disponibilidade"
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value)}
          required
        >
          <option value="">Selecione a disponibilidade</option>
          <option value="Em estoque">Em estoque</option>
          <option value="Esgotado">Esgotado</option>
        </select>

        <label htmlFor="urlImagem">URL da Imagem</label>
        <input
          type="url"
          id="urlImagem"
          placeholder="URL da imagem do prato"
          value={urlImagem}
          onChange={(e) => setUrlImagem(e.target.value)}
          required
        />

        <button type="submit" className='link-lista'>Cadastrar</button>
      </form>
      
      <button onClick={() => navigate('/listar-pratos')} className="link-pratos">
        Ver Pratos Cadastrados
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

export default FormularioCadastroPrato;
