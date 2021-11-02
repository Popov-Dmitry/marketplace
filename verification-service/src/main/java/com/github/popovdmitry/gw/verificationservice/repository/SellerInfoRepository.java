package com.github.popovdmitry.gw.verificationservice.repository;

import com.github.popovdmitry.gw.verificationservice.model.SellerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerInfoRepository extends JpaRepository<SellerInfo, Long> {
}
