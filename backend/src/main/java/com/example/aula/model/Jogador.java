package com.example.aula.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tab_jogador")
public class Jogador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Campo é obrigatório")
    private String nome;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @NotBlank(message = "Campo é obrigatório")
    private String idade;

    @NotBlank(message = "Campo é obrigatório")
    private String altura;

    @NotBlank(message = "Campo é obrigatório")
    private String peso;

    @NotBlank(message = "Campo é obrigatório")
    private String posicao;

    @NotBlank(message = "Campo é obrigatório")
    private String numeroDaCamisa;

    public Jogador() {
    }

    public Jogador(Long id, String nome, Sexo sexo, String idade, String altura, String peso, String posicao, String numeroDaCamisa) {
        this.id = id;
        this.nome = nome;
        this.sexo = sexo;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
        this.posicao = posicao;
        this.numeroDaCamisa = numeroDaCamisa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank(message = "Campo é obrigatório") String getNome() {
        return nome;
    }

    public void setNome(@NotBlank(message = "Campo é obrigatório") String nome) {
        this.nome = nome;
    }

    public Sexo getSexo() {
        return sexo;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }

    public @NotBlank(message = "Campo é obrigatório") String getIdade() {
        return idade;
    }

    public void setIdade(@NotBlank(message = "Campo é obrigatório") String idade) {
        this.idade = idade;
    }

    public @NotBlank(message = "Campo é obrigatório") String getAltura() {
        return altura;
    }

    public void setAltura(@NotBlank(message = "Campo é obrigatório") String altura) {
        this.altura = altura;
    }

    public @NotBlank(message = "Campo é obrigatório") String getPeso() {
        return peso;
    }

    public void setPeso(@NotBlank(message = "Campo é obrigatório") String peso) {
        this.peso = peso;
    }

    public @NotBlank(message = "Campo é obrigatório") String getPosicao() {
        return posicao;
    }

    public void setPosicao(@NotBlank(message = "Campo é obrigatório") String posicao) {
        this.posicao = posicao;
    }

    public @NotBlank(message = "Campo é obrigatório") String getNumeroDaCamisa() {
        return numeroDaCamisa;
    }

    public void setNumeroDaCamisa(@NotBlank(message = "Campo é obrigatório") String numeroDaCamisa) {
        this.numeroDaCamisa = numeroDaCamisa;
    }
}
