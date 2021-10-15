package com.github.popovdmitry.nstu.gw.sellerservice.repository;

import com.github.popovdmitry.nstu.gw.sellerservice.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    Optional<Seller> findSellerByEmail(String email);
}
