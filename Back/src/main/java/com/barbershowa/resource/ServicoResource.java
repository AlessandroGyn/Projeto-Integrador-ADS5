package com.barbershowa.resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.barbershowa.model.Servico;
import com.barbershowa.repository.ServicoRepository;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/servicos")
public class ServicoResource {
    
	@Autowired
	private ServicoRepository servicoRepository;
	
	@GetMapping
	public List<Servico> list() {
		return servicoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Optional<Servico> opF = servicoRepository.findById(id);
		if (opF.isEmpty()) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(opF);
		} 
	}
	
	@PostMapping
	public ResponseEntity<Servico> create(@Valid @RequestBody Servico servico, HttpServletResponse response) { 
		Servico save = servicoRepository.save(servico);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(save.getId()).toUri();
		return ResponseEntity.created(uri).body(save);
	}
	
	@PutMapping("/{id}") 
	public ResponseEntity<Servico> update(@PathVariable Integer id, @Valid @RequestBody Servico servico) {
		Optional<Servico> servicoBanco = servicoRepository.findById(id);
		BeanUtils.copyProperties(servico, servicoBanco.get(), "id");
		servicoRepository.save(servicoBanco.get());
		return ResponseEntity.ok(servico);
	}
	  
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		servicoRepository.deleteById(id);
	}
}
