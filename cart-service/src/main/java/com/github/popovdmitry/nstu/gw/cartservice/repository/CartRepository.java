package com.github.popovdmitry.nstu.gw.cartservice.repository;

import com.github.popovdmitry.nstu.gw.cartservice.model.Cart;
import com.github.popovdmitry.nstu.gw.cartservice.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findAllByCustomerId(Long customerId);
    List<Cart> findAllByProductId(Long productId);
    List<Cart> findAllByProductType(ProductType productType);
}
