package com.barbershowa.model;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "servico")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;
    private String descricao;
    private Float precocusto;
    private Float precovenda;

    @JsonIgnore
    @OneToMany(mappedBy = "servico")
    private List<Agendamento> agendamentos;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Float getPrecoCusto() {
		return precocusto;
	}

	public void setPrecoCusto(Float precoCusto) {
		this.precocusto = precoCusto;
	}

	public Float getPrecoVenda() {
		return precovenda;
	}

	public void setPrecoVenda(Float precoVenda) {
		this.precovenda = precoVenda;
	}

	public List<Agendamento> getAgendamentos() {
		return agendamentos;
	}

	public void setAgendamentos(List<Agendamento> agendamentos) {
		this.agendamentos = agendamentos;
	}

}
