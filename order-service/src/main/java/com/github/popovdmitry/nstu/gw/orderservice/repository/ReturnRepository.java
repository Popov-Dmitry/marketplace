package com.github.popovdmitry.nstu.gw.orderservice.repository;

import com.github.popovdmitry.nstu.gw.orderservice.model.Order;
import com.github.popovdmitry.nstu.gw.orderservice.model.Return;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReturnRepository extends JpaRepository<Return, Long> {
    Optional<Return> findByOrder(Order order);
}
