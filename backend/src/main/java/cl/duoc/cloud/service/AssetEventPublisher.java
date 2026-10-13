package cl.duoc.cloud.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import cl.duoc.cloud.config.RabbitMqConfig;

@Service
public class AssetEventPublisher {

    private static final Logger log = LoggerFactory.getLogger(AssetEventPublisher.class);
    private final RabbitTemplate rabbitTemplate;

    public AssetEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publicarEventoAsset(Object evento) {
        log.info("Publicando mensaje a RabbitMQ: {}", evento);
        rabbitTemplate.convertAndSend(
            RabbitMqConfig.EXCHANGE_NAME,
            RabbitMqConfig.ROUTING_KEY,
            evento
        );
    }
}