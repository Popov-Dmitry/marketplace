package com.github.popovdmitry.gw.verificationservice.listener;

import com.github.popovdmitry.gw.verificationservice.dto.VerificationSellerDto;
import com.github.popovdmitry.gw.verificationservice.model.SellerInfo;
import com.github.popovdmitry.gw.verificationservice.service.SellerInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class MessageListener {

    private final SellerInfoService sellerInfoService;

    @KafkaListener(topics = "${kafka.topic.consumer.seller-topic}",
            groupId = "${kafka.consumer-group.seller-info}", containerFactory = "sellerInfoListener")
    void kafkaSellerInfoListener(ConsumerRecord<String, VerificationSellerDto> consumerRecord) {
        sellerInfoService.saveSellerInfo(new SellerInfo(
                Long.parseLong(consumerRecord.key()),
                consumerRecord.value().getFirstName(),
                consumerRecord.value().getSecondName(),
                consumerRecord.value().getEmail(),
                consumerRecord.value().getShopName(),
                consumerRecord.value().getCountry(),
                consumerRecord.value().getOrganizationType(),
                consumerRecord.value().getInn(),
                consumerRecord.value().getLegalAddress()));
    }
}
