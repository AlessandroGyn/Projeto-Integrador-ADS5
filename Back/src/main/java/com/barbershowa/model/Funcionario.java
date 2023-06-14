package com.barbershowa.model;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "funcionario")
public class Funcionario  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String login;
    private String senha;
    private String email;
    private String fone;
    private Float comissao;

    @JsonIgnore
    @OneToMany(mappedBy = "respAgendamento") // atributo da classe "Agendamento"
    private List<Agendamento> agendamentos;

    @JsonIgnore
    @OneToOne(mappedBy = "respOS")
    private OrdemServico respOS;

    @JsonIgnore
    @OneToOne(mappedBy = "execServico")
    private OrdemServico execServico;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFone() {
		return fone;
	}

	public void setFone(String fone) {
		this.fone = fone;
	}

	public Float getComissao() {
		return comissao;
	}

	public void setComissao(Float comissao) {
		this.comissao = comissao;
	}

	public List<Agendamento> getAgendamentos() {
		return agendamentos;
	}

	public void setAgendamentos(List<Agendamento> agendamentos) {
		this.agendamentos = agendamentos;
	}

	
	public OrdemServico getRespOS() {
		return respOS;
	}

	public void setRespOS(OrdemServico respOS) {
		this.respOS = respOS;
	}

	public OrdemServico getExecServico() {
		return execServico;
	}

	public void setExecServico(OrdemServico execServico) {
		this.execServico = execServico;
	}

}
