package com.github.popovdmitry.nstu.gw.clothesproductservice.config;

import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.KafkaOrderDto;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConsumerConfig {

    @Value("${kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Value("${kafka.consumer-group.order-clothes}")
    private String clothesConsumerGroup;

    @Bean
    public ConsumerFactory<String, KafkaOrderDto> consumerFactoryOrder(){
        Map<String,Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ConsumerConfig.GROUP_ID_CONFIG, clothesConsumerGroup);
        return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), new JsonDeserializer<KafkaOrderDto>(KafkaOrderDto.class, false));
    }

    @Bean(name = "orderListener")
    public ConcurrentKafkaListenerContainerFactory<String, KafkaOrderDto> orderListener(){
        ConcurrentKafkaListenerContainerFactory<String, KafkaOrderDto> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactoryOrder());
        return factory;
    }
}
