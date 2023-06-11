package com.barbershowa.resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.barbershowa.model.Cliente;
import com.barbershowa.repository.AgendamentoRepository;
import com.barbershowa.repository.ClienteRepository;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Date;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/clientes")
public class ClienteResource {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private AgendamentoRepository agendamentoRepository;
	
	@GetMapping
	public List<Cliente> list() {
		return clienteRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Optional<Cliente> opF = clienteRepository.findById(id);
		if (opF.isEmpty()) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(opF);
		}
	}
	
	@PostMapping
	public ResponseEntity<Cliente> create(@Valid @RequestBody Cliente cliente, HttpServletResponse response) { 
		Cliente save = clienteRepository.save(cliente);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(save.getId()).toUri();
		return ResponseEntity.created(uri).body(save);
	}
	
	@PutMapping("/{id}") 
	public ResponseEntity<Cliente> update(@PathVariable Integer id, @Valid @RequestBody Cliente cliente) {
		Optional<Cliente> clienteBanco = clienteRepository.findById(id);
		BeanUtils.copyProperties(cliente, clienteBanco.get(), "id");
		clienteRepository.save(clienteBanco.get());
		return ResponseEntity.ok(cliente);
	  }
	  
	@Transactional
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		
		Optional<Cliente> clienteOptional = clienteRepository.findById(id);
	    if (clienteOptional.isPresent()) {
	        Cliente cliente = clienteOptional.get();
	        Date dataAtual = java.sql.Date.valueOf(LocalDate.now());
	        // antes de apagar o cliente, apaga agendamentos dele atuais - não apaga antigos - apaga data igual e superior a data atual
	        agendamentoRepository.deleteByClienteAndDatasGreaterThanEqual(cliente, dataAtual);
	        // altera coluna cliente para id=31, na tabela agendamentos
			agendamentoRepository.updateClienteIdByClienteId(31, id);
			// Exclui o cliente - na tabela "cliente"
			clienteRepository.deleteById(id);    
	    }
		
	}
	  
}
