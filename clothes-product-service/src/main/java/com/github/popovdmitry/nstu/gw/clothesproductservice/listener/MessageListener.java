package com.github.popovdmitry.nstu.gw.clothesproductservice.listener;

import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.KafkaOrderDto;
import com.github.popovdmitry.nstu.gw.clothesproductservice.service.ClothesProductService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class MessageListener {

    private final ClothesProductService clothesProductService;

    @KafkaListener(topics = "${kafka.topic.consumer.order-clothes-topic}",
            groupId = "${kafka.consumer-group.order-clothes}", containerFactory = "orderListener")
    void kafkaOrderListener(ConsumerRecord<String, KafkaOrderDto> consumerRecord) {
        try {
            clothesProductService.updateClothesCount(consumerRecord.value());
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
    }
}
