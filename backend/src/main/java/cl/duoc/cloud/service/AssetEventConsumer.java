package cl.duoc.cloud.service;

import cl.duoc.cloud.config.RabbitMqConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service 
public class AssetEventConsumer {
    
    private static final Logger log = LoggerFactory.getLogger(AssetEventConsumer.class);

    @RabbitListener(queues = RabbitMqConfig.QUEUE_NAME)
    public void procesarMensaje(Object evento) {
        log.info("Mensaje recibido de RabbitMQ: {}", evento);

        if (evento.toString().contains("ERROR")) {
            log.error("Error al procesar mensaje. Reenvio a DLQ. . .");
            throw new RuntimeException("Procesamiento fallido voluntario para mandar a DLQ");
        }
    }

    @RabbitListener(queues = RabbitMqConfig.DLQ_NAME)
    public void registrarMensajeDLQ(Object mensajeFallido) {
        log.warn("ALERTA DLQ: Se ha recibido un mensaje no procesado en la DLQ: {}", mensajeFallido);
    }
}
