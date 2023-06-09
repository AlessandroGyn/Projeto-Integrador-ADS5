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

    @Column(name = "datahorainicio")  // nome da coluna no BD
    private Date dataHoraInicio;
    
    @Column(name = "datahoratermino")
    private Date dataHoraTermino;
    
    private String status;
    private Float valor;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "agendamento") // nome da coluna no BD
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
    
    public OrdemServico(Integer id, Date dataHoraInicio, Date dataHoraTermino, String status, Float valor,
			Agendamento agendamento, Servico servico, Funcionario respOS, Funcionario execServico) {
		super();
		this.id = id;
		this.dataHoraInicio = dataHoraInicio;
		this.dataHoraTermino = dataHoraTermino;
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
		return dataHoraInicio;
	}

	public void setDataHoraInicio(Date dataHoraInicio) {
		this.dataHoraInicio = dataHoraInicio;
	}

	public Date getDataHoraTermino() {
		return dataHoraTermino;
	}

	public void setDataHoraTermino(Date dataHoraTermino) {
		this.dataHoraTermino = dataHoraTermino;
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
