package com.barbershowa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.barbershowa.model.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

}

