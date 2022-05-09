package com.github.popovdmitry.nstu.gw.orderservice.repository;

import com.github.popovdmitry.nstu.gw.orderservice.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByCustomerId(Long customerId);
    List<Order> findAllBySellerId(Long sellerId);
    List<Order> findAllByProductId(Long productId);
    List<Order> findAllByProductDetailsId(Long productDetailsId);
}
