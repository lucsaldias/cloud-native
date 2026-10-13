package cl.duoc.cloud.controller;

import org.springframework.web.bind.annotation.RestController;

import cl.duoc.cloud.service.RabbitAdminService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("/api/admin/rabbitmq")
public class RabbitAdminController {

    private final RabbitAdminService rabbitAdminService;

    public RabbitAdminController(RabbitAdminService rabbitAdminService) {
        this.rabbitAdminService = rabbitAdminService;
    }

    @PostMapping("/queues/{nombre}")
    public ResponseEntity<String> crearCola(@PathVariable String nombre) {
        rabbitAdminService.crearCola(nombre);
        return ResponseEntity.ok("Cola '" + nombre + "' creada correctamente.");
    }

    @DeleteMapping("/queues/{nombre}")
    public ResponseEntity<String> eliminarCola(@PathVariable String nombre) {
        boolean exito = rabbitAdminService.eliminarCola(nombre);
        return exito ? ResponseEntity.ok("Cola eliminada.") : ResponseEntity.notFound().build(); 
    }
    
    @PostMapping("/exchanges/{nombre}")
    public ResponseEntity<String> crearExchange(@PathVariable String nombre) {
        rabbitAdminService.crearExchangeDirect(nombre);
        return ResponseEntity.ok("Exchange '" + nombre + "' creado correctamente.");
    }

    @DeleteMapping("/exchanges/{nombre}")
    public ResponseEntity<String> eliminarExchangeDirect(@PathVariable String nombre) {
        boolean exito = rabbitAdminService.eliminarExchangeDirect(nombre);
        return exito ? ResponseEntity.ok("Exchange eliminado") : ResponseEntity.notFound().build();
    }

    @PostMapping("/bindings")
    public ResponseEntity<String> crearBinding(@RequestParam String cola, @RequestParam String exchange, @RequestParam String routingKey) {
        rabbitAdminService.crearBinding(cola, exchange, routingKey);
        return ResponseEntity.ok("Binding creado con exito.");
    }

    @DeleteMapping("/bindings")
    public ResponseEntity<String> eliminarBinding(@RequestParam String cola, @RequestParam String exchange, @RequestParam String routingKey) {
        rabbitAdminService.eliminarBinding(cola, exchange, routingKey);
        return ResponseEntity.ok("Binding eliminado correctamente.");
    }
}
