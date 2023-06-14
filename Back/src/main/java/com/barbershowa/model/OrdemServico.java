package com.barbershowa.model;
import java.sql.Timestamp;
import java.util.Date;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "ordemservico")
public class OrdemServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "datahorainicio")  // nome da coluna no BD
    private Timestamp  dataHoraInicio;
    
    @Column(name = "datahoratermino")
    private Timestamp  dataHoraTermino;
    
    private String status;
    private Float valor;

    
    @OneToOne(mappedBy = "ordemServico") // nome da classe no objeto Agendamento
    @JsonManagedReference
    private Agendamento agendamento;

    @ManyToOne
    @JoinColumn(name = "servico")
    private Servico servico;

    
    @ManyToOne
    @JoinColumn(name = "respos")
    private Funcionario respOS;

    
    @ManyToOne
    @JoinColumn(name = "execservico")
    private Funcionario execServico;

    public OrdemServico() {}
    
   

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	

	public Timestamp getDataHoraInicio() {
		return dataHoraInicio;
	}



	public void setDataHoraInicio(Timestamp dataHoraInicio) {
		this.dataHoraInicio = dataHoraInicio;
	}



	public Timestamp getDataHoraTermino() {
		return dataHoraTermino;
	}



	public void setDataHoraTermino(Timestamp dataHoraTermino) {
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
