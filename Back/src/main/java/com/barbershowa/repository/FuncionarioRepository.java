package com.barbershowa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.barbershowa.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {

}

