package com.barbershowa.resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.barbershowa.model.Cliente;
import com.barbershowa.repository.ClienteRepository;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/clientes")
public class ClienteResource {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
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
	  
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer	id) {
		clienteRepository.deleteById(id);
	}
	  
}
