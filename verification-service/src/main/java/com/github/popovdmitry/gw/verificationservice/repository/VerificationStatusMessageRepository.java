package com.github.popovdmitry.gw.verificationservice.repository;

import com.github.popovdmitry.gw.verificationservice.model.VerificationStatusMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationStatusMessageRepository extends JpaRepository<VerificationStatusMessage, Long> {
    Optional<VerificationStatusMessage> findBySellerId(Long sellerId);
}
