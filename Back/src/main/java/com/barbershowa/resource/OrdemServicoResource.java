package com.barbershowa.resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.barbershowa.model.OrdemServico;
import com.barbershowa.repository.OrdemServicoRepository;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/ordemservicos")
public class OrdemServicoResource {
	
	@Autowired
	private OrdemServicoRepository ordemServicoRepository;
	
	@GetMapping
	public List<OrdemServico> list() {
		return ordemServicoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
	    Optional<OrdemServico> opF = ordemServicoRepository.findById(id);
	    return opF.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	
	@PostMapping
	public ResponseEntity<OrdemServico> create(@Valid @RequestBody OrdemServico ordemServico, HttpServletResponse response) { 
		OrdemServico save = ordemServicoRepository.save(ordemServico);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(save.getId()).toUri();
		return ResponseEntity.created(uri).body(save);
	}
	
	@PutMapping("/{id}") 
	public ResponseEntity<OrdemServico> update(@PathVariable Integer id, @Valid @RequestBody OrdemServico ordemServico) {
		Optional<OrdemServico> ordemServicoBanco = ordemServicoRepository.findById(id);
		BeanUtils.copyProperties(ordemServico, ordemServicoBanco.get(), "id");
		ordemServicoRepository.save(ordemServicoBanco.get());
		return ResponseEntity.ok(ordemServico);
	}
	  
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		ordemServicoRepository.deleteById(id);
	}
}
