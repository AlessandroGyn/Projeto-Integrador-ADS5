package com.barbershowa.repository;
import java.util.Date;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.barbershowa.model.Agendamento;
import com.barbershowa.model.Cliente;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {
	/*
	Abaixo irá executar uma atualização em lote usando a consulta JPQL 
	para atualizar o campo clienteStatus dos agendamentos do cliente especificado.
	
	@Modifying
	@Query("UPDATE Agendamento a SET a.clienteStatus = :clienteStatus WHERE a.cliente.id = :clienteId")
	void updateClienteStatusByClienteId(@Param("clienteStatus") boolean clienteStatus, @Param("clienteId") Integer clienteId);
	*/
	
	/*
	 Abaixo irá executar uma exclusão em lote usando a consulta JPQL para excluir os agendamentos do cliente especificado com data igual ou superior à data fornecida.
	 */
	void deleteByClienteAndDatasGreaterThanEqual(Cliente cliente, Date dataAtual);
	/*
	Abaixo, antes de excluir o funcionário, 
	os agendamentos relacionados a ele serão atualizados 
	para que sejam associados ao funcionário com id = 3.
	*/
	@Transactional
	@Modifying
	@Query("UPDATE Agendamento a SET a.respAgendamento.id = :novoFuncionarioId WHERE a.respAgendamento.id = :funcionarioId")
	void updateFuncionarioIdByFuncionarioId(@Param("novoFuncionarioId") Integer novoFuncionarioId, @Param("funcionarioId") Integer funcionarioId);
	/*
	Abaixo, antes de excluir o serviço, 
	os agendamentos relacionados a ele serão atualizados 
	para que sejam associados ao serviço com id = 29.
	*/
	@Transactional
	@Modifying
	@Query("UPDATE Agendamento a SET a.servico.id = :novoServicoId WHERE a.servico.id = :servicoId")
	void updateServicoIdByServicoId(@Param("novoServicoId") Integer novoServicoId, @Param("servicoId") Integer servicoId);
	/*
	Abaixo, antes de excluir o cliente, 
	os agendamentos relacionados a ele serão atualizados 
	para que sejam associados ao cliente com id = 31.
	*/
	@Transactional
	@Modifying
	@Query("UPDATE Agendamento a SET a.cliente.id = :novoClienteId WHERE a.cliente.id = :clienteId")
	void updateClienteIdByClienteId(@Param("novoClienteId") Integer novoClienteId, @Param("clienteId") Integer clienteId);
	
}
