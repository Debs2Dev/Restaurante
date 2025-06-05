// src\components\FormularioCadastro\index.js

import { useState } from "react";
import './styles.css'
import { useNavigate } from "react-router-dom";
import useMensagem from '../../hooks/useMensagem'
import MensagemFeedback from '../MensagemFeedback'
import logo from '../../assets/images/logo.png'
import axios from 'axios'

function FormularioCadastro()
{
    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')
    const [categoria, setCategoria] = useState('')
    const [disponibilidade, setDisponibilidade] = useState('')
    const [urlImagem, setUrlImagem] = useState('')
    const navigate = useNavigate()
    const { exibirMensagem , mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem()

    const cadastrarPrato = async () =>
    {
        try
        {
            const response = await axios.post('https://restaurante-r6uq.onrender.com/api/pratos', {nomePrato, descricao, preco, categoria, disponibilidade, urlImagem})
            exibirMensagem(response.data.mensagem || 'Prato cadastrado com sucesso!', 'sucesso')
            setNomePrato('')
            setDescricao('')
            setPreco('')
            setCategoria('')
            setUrlImagem('')
            setDisponibilidade('')
        } catch (error)
        {
            let erroMsg = 'Erro ao conectar ao servidor.'
            if (error.response && error.response.data)
                {
                erroMsg = error.response.data.mensagem
                if (error.response.data.erros) {
                    erroMsg += ' ' + Object.values(error.response.data.erros).join(', ')
                }
            }
            exibirMensagem(erroMsg, 'erro')
        }
    }

    return (
        <div className="container">
            <img src={logo} alt="Logo da empresa" />
            <h2>Cadastro de pratos</h2>
            <form onSubmit={(e) => {e.preventDefault(); cadastrarPrato()}}>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome"
                    value={nomePrato}
                    onChange={(e) => setNomePrato(e.target.value)}
                    required
                />
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="">Selecione a categoria</option>
                    <option value="ENTRADA">Entrada</option>
                    <option value="SOBREMESA">Sobremesa</option>
                    <option value="PRATO_PRINCIPAL">Prato Principal</option>
                    <option value="BEBIDA">Bebida</option>
                </select>
                <input
                    type="descricao"
                    id="descricao"
                    placeholder="Descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
                <input
                    type="preco"
                    id="preco"
                    placeholder="Preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="url"
                    placeholder="Url"
                    value={urlImagem}
                    onChange={(e) => setUrlImagem(e.target.value)}
                    required
                />
                <select
                    id="disponibilidade"
                    value={disponibilidade}
                    onChange={(e) => setDisponibilidade(e.target.value)}
                    required
                >
                    <option value="">Selecione a disponibilidade</option>
                    <option value="EM_ESTOQUE">Em Estoque</option>
                    <option value="ESGOTADO">Esgotado</option>
                </select>
                <button type="submit">Cadastrar</button>
            </form>

            <button onClick={() => navigate('/pratos')} className="link-pratos">
                Ver pratos cadastrados
            </button>

            <MensagemFeedback
                mensagem={mensagem}
                tipo={tipoMensagem}
                visivel={visivel}
                onclose={fecharMensagem}
            />
        </div>
    )
}

export default FormularioCadastro
