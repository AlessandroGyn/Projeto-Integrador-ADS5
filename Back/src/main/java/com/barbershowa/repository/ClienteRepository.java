package com.barbershowa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.barbershowa.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

}

