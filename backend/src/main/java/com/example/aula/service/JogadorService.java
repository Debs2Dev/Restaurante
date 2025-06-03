package com.example.aula.service;

import com.example.aula.exception.IdJaCadastradoException;
import com.example.aula.model.Jogador;
import com.example.aula.repository.JogadorRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Date;
import java.util.List;

@Service
@Validated
public class JogadorService {
    private JogadorRepository jogadorRepository;

    public JogadorService(JogadorRepository jogadorRepository) {
        this.jogadorRepository = jogadorRepository;
    }

    public List<Jogador> listarTodos() {
        return jogadorRepository.findAll();
    }

    public Jogador salvar(@Valid Jogador jogador) {
        if (jogadorRepository.findById(jogador.getNumeroDaCamisa()).isPresent()) {
            throw new IdJaCadastradoException("Jogador já cadastrado.");
        }

        return jogadorRepository.save(jogador);
    }

    public Jogador atualizar(@Valid Jogador jogador) {
        Jogador jogadorAtualizar = jogadorRepository.findById(jogador.getNumeroDaCamisa())
                .orElseThrow(() -> new IllegalArgumentException("Jogador não encontrado."));

        jogadorAtualizar.setNome(jogador.getNome());


        return jogadorRepository.save(jogadorAtualizar);
    }

    public void excluir(String numeroDaCamisa) {
        Jogador jogadorExcluir = jogadorRepository.findByNumeroDaCamisa(numeroDaCamisa)
                .orElseThrow(() -> new RuntimeException("Jogador não encontrado"));

        jogadorRepository.deleteById(jogadorExcluir.getNumeroDaCamisa());
    }

}
