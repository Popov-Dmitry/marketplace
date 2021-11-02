package com.github.popovdmitry.gw.verificationservice.config;

import com.github.popovdmitry.gw.verificationservice.dto.VerificationSellerDto;
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

    @Value("${kafka.consumer-group.seller-info}")
    private String sellerConsumerGroup;

    @Bean
    public ConsumerFactory<String, VerificationSellerDto> consumerFactorySeller(){
        Map<String,Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ConsumerConfig.GROUP_ID_CONFIG, sellerConsumerGroup);
        return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), new JsonDeserializer<VerificationSellerDto>(VerificationSellerDto.class, false));
    }

    @Bean(name = "sellerInfoListener")
    public ConcurrentKafkaListenerContainerFactory<String, VerificationSellerDto> sellerInfoListener(){
        ConcurrentKafkaListenerContainerFactory<String, VerificationSellerDto> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactorySeller());
        return factory;
    }
}
