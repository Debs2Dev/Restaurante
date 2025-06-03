package com.example.aula.service;

import com.example.aula.exception.IdJaCadastradoException;
import com.example.aula.model.Prato;
import com.example.aula.repository.PratoRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class PratoService {
    private PratoRepository pratoRepository;

    public PratoService(PratoRepository pratoRepository) {
        this.pratoRepository = pratoRepository;
    }

    public List<Prato> listarTodos() {
        return pratoRepository.findAll();
    }

    public Prato salvar(@Valid Prato prato) {
        // Verificação opcional para evitar duplicidade de nomes
        if (prato.getId() == null && pratoRepository.findByNome(prato.getNome()).isPresent()) {
            throw new IdJaCadastradoException("Já existe um prato com este nome.");
        }

        return pratoRepository.save(prato);
    }

    public Prato atualizar(@Valid Prato prato) {
        if (prato.getId() == null) {
            throw new IllegalArgumentException("ID do prato é obrigatório para atualização.");
        }
        
        Prato pratoAtualizar = pratoRepository.findById(prato.getId())
                .orElseThrow(() -> new IllegalArgumentException("Prato não encontrado."));

        pratoAtualizar.setNome(prato.getNome());
        pratoAtualizar.setDescricao(prato.getDescricao());
        pratoAtualizar.setPreco(prato.getPreco());
        pratoAtualizar.setCategoria(prato.getCategoria());
        pratoAtualizar.setDisponibilidade(prato.getDisponibilidade());
        pratoAtualizar.setUrlImagem(prato.getUrlImagem());

        return pratoRepository.save(pratoAtualizar);
    }

    public void excluir(Long id) {
        Prato pratoExcluir = pratoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prato não encontrado"));

        pratoRepository.delete(pratoExcluir);
    }
}
