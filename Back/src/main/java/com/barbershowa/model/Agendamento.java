package com.barbershowa.model;
import java.util.Date;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "agendamento")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date datas;
    private Date hora;
    private String status;
    private String observacao;
    
    @OneToOne
    @JoinColumn(name = "id") 
    @JsonBackReference
    private OrdemServico ordemServico;
    
    @ManyToOne
    @JoinColumn(name = "cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "respagendamento")
    private Funcionario respAgendamento;

    @ManyToOne
    @JoinColumn(name = "servico")
    private Servico servico;


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDatas() {
		return datas;
	}

	public void setDatas(Date datas) {
		this.datas = datas;
	}

	public Date getHora() {
		return hora;
	}

	public void setHora(Date hora) {
		this.hora = hora;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public OrdemServico getOrdemServico() {
		return ordemServico;
	}

	public void setOrdemServico(OrdemServico ordemServico) {
		this.ordemServico = ordemServico;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Funcionario getRespAgendamento() {
		return respAgendamento;
	}

	public void setRespAgendamento(Funcionario respAgendamento) {
		this.respAgendamento = respAgendamento;
	}

	public Servico getServico() {
		return servico;
	}

	public void setServico(Servico servico) {
		this.servico = servico;
	}

}
