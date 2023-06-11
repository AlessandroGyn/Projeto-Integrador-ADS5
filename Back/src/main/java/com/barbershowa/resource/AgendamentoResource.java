package com.barbershowa.resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.barbershowa.model.Agendamento;
import com.barbershowa.repository.AgendamentoRepository;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/agendamentos")
public class AgendamentoResource {
	
	@Autowired
	private AgendamentoRepository agendamentoRepository;
	
	@GetMapping
	public List<Agendamento> list() {
		return agendamentoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Optional<Agendamento> opF = agendamentoRepository.findById(id);
		if (opF.isEmpty()) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(opF);
		}
	}
	
	@PostMapping
	public ResponseEntity<Agendamento> create(@Valid @RequestBody Agendamento agendamento, HttpServletResponse response) { 
		Agendamento save = agendamentoRepository.save(agendamento);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(save.getId()).toUri();
		return ResponseEntity.created(uri).body(save);
	}
	
	@PutMapping("/{id}") 
	public ResponseEntity<Agendamento> update(@PathVariable Integer id, @Valid @RequestBody Agendamento agendamento) {
		Optional<Agendamento> agendamentoBanco = agendamentoRepository.findById(id);
		BeanUtils.copyProperties(agendamento, agendamentoBanco.get(), "id");
		agendamentoRepository.save(agendamentoBanco.get());
		return ResponseEntity.ok(agendamento);
	}
	  
	
	@Transactional
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		agendamentoRepository.deleteById(id);
	}
}
