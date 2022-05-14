package com.github.popovdmitry.nstu.gw.deliveryservice.repository;

import com.github.popovdmitry.nstu.gw.deliveryservice.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findAllBySellerId (Long sellerId);
}
