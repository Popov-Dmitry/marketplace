package com.github.popovdmitry.gw.verificationservice.service;

import com.github.popovdmitry.gw.verificationservice.dto.VerificationVerdictDto;
import com.github.popovdmitry.gw.verificationservice.model.SellerInfo;
import com.github.popovdmitry.gw.verificationservice.model.VerificationStatusMessage;
import com.github.popovdmitry.gw.verificationservice.repository.SellerInfoRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class SellerInfoService {

    @Value("${kafka.topic.producer.moderated-seller-topic}")
    private String moderatedSellerTopic;

    private final SellerInfoRepository sellerInfoRepository;
    private final VerificationStatusMessageService verificationStatusMessageService;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public SellerInfo findById(Long id) throws NotFoundException {
        return sellerInfoRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Seller info with id %d is not found", id)));
    }

    public List<SellerInfo> getAll() {
        return sellerInfoRepository.findAll();
    }

    public SellerInfo saveSellerInfo(SellerInfo sellerInfo) {
        return sellerInfoRepository.save(sellerInfo);
    }

    public void deleteSellerInfo(Long id, VerificationVerdictDto verificationVerdictDto) throws NotFoundException {
        SellerInfo sellerInfo = sellerInfoRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Seller info with id %d is not found", id)));
        if (Objects.nonNull(verificationVerdictDto.getMessage())
                && !verificationVerdictDto.getMessage().isEmpty()) {
            VerificationStatusMessage verificationStatusMessage = new VerificationStatusMessage();
            verificationStatusMessage.setSellerId(id);
            verificationStatusMessage.setMessage(verificationVerdictDto.getMessage());
            verificationStatusMessageService.saveVerificationStatusMessage(verificationStatusMessage);
        }
        sellerInfoRepository.delete(sellerInfo);
        kafkaTemplate.send(
                moderatedSellerTopic,
                id.toString(),
                verificationVerdictDto.getVerificationStatus().toString());
    }
}
