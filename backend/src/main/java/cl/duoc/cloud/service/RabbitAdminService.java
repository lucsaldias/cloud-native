package cl.duoc.cloud.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.*;
import org.springframework.stereotype.Service;

@Service 
public class RabbitAdminService {
    
    private static final Logger log = LoggerFactory.getLogger(RabbitAdminService.class);
    private final AmqpAdmin amqpAdmin;

    public RabbitAdminService(AmqpAdmin amqpAdmin) {
        this.amqpAdmin = amqpAdmin;
    }

    // Creacion y eliminacion de colas.
    public void crearCola(String nombreCola) {
        Queue queue = QueueBuilder.durable(nombreCola).build();
        amqpAdmin.declareQueue(queue);
        log.info("Cola creada exitosamente: {}", nombreCola); 
    }

    public boolean eliminarCola(String nombreCola) {
        log.info("Eliminando cola: {}", nombreCola);
        return amqpAdmin.deleteQueue(nombreCola);
    }

    // Creacion y eliminar Exchanges.
    public void crearExchangeDirect(String nombreExchange) {
        Exchange exchange = ExchangeBuilder.directExchange(nombreExchange).durable(true).build();
        amqpAdmin.declareExchange(exchange);
        log.info("Exchange direct creado: {}", nombreExchange);
    }

    public boolean eliminarExchangeDirect(String nombreExchange) {
        log.info("Eliminando exchange direct: {}", nombreExchange);
        return amqpAdmin.deleteExchange(nombreExchange);
    }

    // Creacion y eliminacion de Bindings.
    public void crearBinding(String nombreCola, String nombreExchange, String routingKey) {
        Binding binding = new Binding(
                nombreCola,
                Binding.DestinationType.QUEUE,
                nombreExchange,
                routingKey,
                null
        );
        amqpAdmin.declareBinding(binding);
        log.info("Binding creado entre cola '{}' y exchange '{}' con key '{}'", nombreCola, nombreExchange, routingKey);
    }

    public void eliminarBinding(String nombreCola, String nombreExchange, String routingKey) {
        Binding binding = new Binding(
                nombreCola,
                Binding.DestinationType.QUEUE,
                nombreExchange,
                routingKey,
                null
        );
        amqpAdmin.removeBinding(binding);
        log.info("Binding eliminado entre cola '{}' y exchange con '{}'", nombreCola, nombreExchange);
    }
}
