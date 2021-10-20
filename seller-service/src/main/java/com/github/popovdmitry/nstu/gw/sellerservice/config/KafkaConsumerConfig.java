package com.github.popovdmitry.nstu.gw.sellerservice.config;

import com.github.popovdmitry.nstu.gw.sellerservice.model.Seller;
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

    @Value("${kafka.consumer-group.seller}")
    private String sellerConsumerGroup;

    @Bean
    public ConsumerFactory<String, Seller> consumerFactorySeller(){
        Map<String,Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ConsumerConfig.GROUP_ID_CONFIG, sellerConsumerGroup);
        return new DefaultKafkaConsumerFactory<>(config,new StringDeserializer(), new JsonDeserializer<Seller>(Seller.class, false));
    }

    @Bean(name = "sellerListener")
    public ConcurrentKafkaListenerContainerFactory<String, Seller> sellerListener(){
        ConcurrentKafkaListenerContainerFactory<String, Seller> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactorySeller());
        return factory;
    }
}
