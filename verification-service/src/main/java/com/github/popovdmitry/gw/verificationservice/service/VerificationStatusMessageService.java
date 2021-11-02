package com.github.popovdmitry.gw.verificationservice.service;

import com.github.popovdmitry.gw.verificationservice.model.VerificationStatusMessage;
import com.github.popovdmitry.gw.verificationservice.repository.VerificationStatusMessageRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class VerificationStatusMessageService {

    private final VerificationStatusMessageRepository verificationStatusMessageRepository;

    public VerificationStatusMessage findBySellerId(Long sellerId) throws NotFoundException {
        return verificationStatusMessageRepository.findBySellerId(sellerId)
                .orElseThrow(() -> new NotFoundException(
                        String.format("Seller with id %d is not found", sellerId)));
    }

    public VerificationStatusMessage saveVerificationStatusMessage(VerificationStatusMessage verificationStatusMessage) {
        return verificationStatusMessageRepository.save(verificationStatusMessage);
    }

    public VerificationStatusMessage updateVerificationStatusMessage(Long sellerId,
                                                                     VerificationStatusMessage newVerificationStatusMessage) {
        return verificationStatusMessageRepository.save(newVerificationStatusMessage);
    }

    public void deleteVerificationStatusMessageBySellerId(Long sellerId) throws NotFoundException {
        VerificationStatusMessage seller = verificationStatusMessageRepository
                .findBySellerId(sellerId).orElseThrow(() ->
                new NotFoundException(String.format("Seller with id %d is not found", sellerId)));
        verificationStatusMessageRepository.delete(seller);
    }
}
