package com.example.aula.controller;

import com.example.aula.model.Jogador;
import com.example.aula.service.JogadorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/jogador")
public class JogadorController {

    private JogadorService jogadorService;

    public JogadorController(JogadorService jogadorService) {
        this.jogadorService = jogadorService;
    }

    @GetMapping
    public List<Jogador> listarTodos() {
        return jogadorService.listarTodos();
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody Jogador jogador) {
        jogadorService.salvar(jogador);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("mensagem", "Jogador cadastrado com sucesso."));
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> atualizar(@Valid @RequestBody Jogador jogador) {
        jogadorService.atualizar(jogador);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("mensagem", "Jogador atualizado com sucesso"));
    }

    @DeleteMapping("/{numeroDaCamisa}")
    public ResponseEntity<Map<String, Object>> excluir(@PathVariable String numeroDaCamisa) {
        jogadorService.excluir(numeroDaCamisa);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("mensagem", "Jogador excluído com sucesso"));
    }
}
