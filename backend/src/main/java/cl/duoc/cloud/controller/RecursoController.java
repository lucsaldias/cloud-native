package cl.duoc.cloud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.duoc.cloud.entity.Recurso;
import cl.duoc.cloud.service.RecursoService;


@RestController
@RequestMapping("/recursos")
public class RecursoController {

    @Autowired
    private RecursoService recursoService;

    @GetMapping
    public List<Recurso> obtenerRecursos() {
        return recursoService.obtenerRecursos();
    }

    @PostMapping
    public Recurso guardarRecurso(@RequestBody Recurso rec) {
        return recursoService.guardarRecurso(rec);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recurso> obtenerRecursoPorId(@PathVariable("id") Integer id) {
        return recursoService.obtenerRecursoPorId(id)
            .map(recurso -> ResponseEntity.ok(recurso))
            .orElseGet(() -> ResponseEntity.<Recurso>notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recurso> actualizarRecurso(@PathVariable("id") Integer id, @RequestBody Recurso rec) {
        return recursoService.actualizarRecurso(id, rec)
            .map(recursoActualizado -> ResponseEntity.ok(recursoActualizado))
            .orElseGet(() -> ResponseEntity.<Recurso>notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRecursoPorId(@PathVariable("id") Integer id) {
        if (recursoService.eliminarRecursoPorId(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}