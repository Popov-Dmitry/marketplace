package com.github.popovdmitry.nstu.gw.sellerservice.listener;

import com.github.popovdmitry.nstu.gw.sellerservice.service.SellerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class MessageListener {

    private final SellerService sellerService;

    @KafkaListener(topics = "${kafka.topic.consumer.moderated-seller-topic}",
            groupId = "${kafka.consumer-group.moderated-seller}", containerFactory = "moderatedSellerListener")
    void kafkaUsersListener(ConsumerRecord<String, String> consumerRecord) {
        sellerService.updateModeratedSeller(consumerRecord.key(), consumerRecord.value());
    }
}
