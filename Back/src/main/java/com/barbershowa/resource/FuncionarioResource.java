package com.barbershowa.resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.barbershowa.model.Funcionario;
import com.barbershowa.repository.FuncionarioRepository;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/funcionarios")
public class FuncionarioResource {
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	@GetMapping
	public List<Funcionario> list() {
		return funcionarioRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Optional<Funcionario> opF = funcionarioRepository.findById(id);
		if (opF.isEmpty()) {
			return ResponseEntity.notFound().build();  //noContent
		} else {
			return ResponseEntity.ok(opF);
		}
	}
	
	@PostMapping
	public ResponseEntity<Funcionario> create(@Valid @RequestBody Funcionario funcionario, HttpServletResponse response) { 
		Funcionario save = funcionarioRepository.save(funcionario);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(save.getId()).toUri();
		return ResponseEntity.created(uri).body(save);
	}
	
	@PutMapping("/{id}") 
	public ResponseEntity<Funcionario> update(@PathVariable Integer id, @Valid @RequestBody Funcionario funcionario) {
		Optional<Funcionario> funcionarioBanco = funcionarioRepository.findById(id);
		if (funcionarioBanco.isPresent()) {
	        BeanUtils.copyProperties(funcionario, funcionarioBanco.get(), "id");
	        funcionarioRepository.save(funcionarioBanco.get());
	        return ResponseEntity.ok(funcionario);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	  
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer	id) {
		funcionarioRepository.deleteById(id);
	}
}
