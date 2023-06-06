package com.barbershowa.model;
import java.util.Date;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ordemservico")
public class OrdemServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    private Date datahorainicio;
    private Date datahoratermino;
    private String status;
    private Float valor;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "agendamento")
    private Agendamento agendamento;

    @ManyToOne
    @JoinColumn(name = "servico")
    private Servico servico;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "respos")
    private Funcionario respOS;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "execservico")
    private Funcionario execServico;

    public OrdemServico() {}
    
    public OrdemServico(Integer id, Date datanorainicio, Date datahoratermino, String status, Float valor,
			Agendamento agendamento, Servico servico, Funcionario respOS, Funcionario execServico) {
		super();
		this.id = id;
		this.datahorainicio = datanorainicio;
		this.datahoratermino = datahoratermino;
		this.status = status;
		this.valor = valor;
		this.agendamento = agendamento;
		this.servico = servico;
		this.respOS = respOS;
		this.execServico = execServico;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDataHoraInicio() {
		return datahorainicio;
	}

	public void setDataHoraInicio(Date dataHoraInicio) {
		this.datahorainicio = dataHoraInicio;
	}

	public Date getDataHoraTermino() {
		return datahoratermino;
	}

	public void setDataHoraTermino(Date dataHoraTermino) {
		this.datahoratermino = dataHoraTermino;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Float getValor() {
		return valor;
	}

	public void setValor(Float valor) {
		this.valor = valor;
	}

	public Agendamento getAgendamento() {
		return agendamento;
	}

	public void setAgendamento(Agendamento agendamento) {
		this.agendamento = agendamento;
	}

	public Servico getServico() {
		return servico;
	}

	public void setServico(Servico servico) {
		this.servico = servico;
	}

	public Funcionario getRespOS() {
		return respOS;
	}

	public void setRespOS(Funcionario respOS) {
		this.respOS = respOS;
	}

	public Funcionario getExecServico() {
		return execServico;
	}

	public void setExecServico(Funcionario execServico) {
		this.execServico = execServico;
	}

}
