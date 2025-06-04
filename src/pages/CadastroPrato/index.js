import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import styles

function CadastroPrato() {
  const [formData, setFormData] = useState({
    nomePrato: '',
    descricao: '',
    preco: '',
    categoria: 'Prato Principal', // Default category
    disponibilidade: 'Em estoque', // Default availability
    urlImagem: ''
  });
  const [mensagem, setMensagem] = useState(''); // For feedback messages
  const [erro, setErro] = useState(''); // For error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    // Basic validation (can be expanded)
    if (!formData.nomePrato || !formData.descricao || !formData.preco || !formData.urlImagem) {
        setErro('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    try {
      // Adjust the URL if your backend runs on a different port or host
      const response = await axios.post('http://localhost:8080/api/pratos', {
          ...formData,
          preco: parseFloat(formData.preco) // Ensure price is a number
      });
      setMensagem(`Prato '${response.data.pratoNome || formData.nomePrato}' cadastrado com sucesso! ID: ${response.data.pratoId}`);
      // Clear the form after successful submission
      setFormData({
        nomePrato: '',
        descricao: '',
        preco: '',
        categoria: 'Prato Principal',
        disponibilidade: 'Em estoque',
        urlImagem: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar prato:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErro(`Erro ao cadastrar: ${error.response.data.message}`);
      } else if (error.response && error.response.status === 400) {
          // Handle validation errors from backend if available
          const errorFields = error.response.data.errors ? error.response.data.errors.map(err => err.field).join(', ') : 'dados inválidos';
          setErro(`Erro de validação: Verifique os campos (${errorFields}).`);
      } else {
        setErro('Erro ao conectar com o servidor. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="cadastro-prato-container">
      <h2>Cadastrar Novo Prato</h2>
      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}
      <form onSubmit={handleSubmit} className="cadastro-prato-form">
        <div className="form-group">
          <label htmlFor="nomePrato">Nome do Prato:</label>
          <input
            type="text"
            id="nomePrato"
            name="nomePrato"
            value={formData.nomePrato}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preco">Preço (R$):</label>
          <input
            type="number"
            id="preco"
            name="preco"
            step="0.01"
            min="0"
            value={formData.preco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="Entrada">Entrada</option>
            <option value="Prato Principal">Prato Principal</option>
            <option value="Sobremesa">Sobremesa</option>
            <option value="Bebida">Bebida</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="disponibilidade">Disponibilidade:</label>
          <select
            id="disponibilidade"
            name="disponibilidade"
            value={formData.disponibilidade}
            onChange={handleChange}
          >
            <option value="Em estoque">Em estoque</option>
            <option value="Esgotado">Esgotado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="urlImagem">URL da Imagem:</label>
          <input
            type="url"
            id="urlImagem"
            name="urlImagem"
            value={formData.urlImagem}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Cadastrar Prato</button>
      </form>
    </div>
  );
}

export default CadastroPrato;

