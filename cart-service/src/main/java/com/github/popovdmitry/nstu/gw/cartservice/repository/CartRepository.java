package com.github.popovdmitry.nstu.gw.cartservice.repository;

import com.github.popovdmitry.nstu.gw.cartservice.model.Cart;
import com.github.popovdmitry.nstu.gw.cartservice.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findAllByCustomerId(Long customerId);
    List<Cart> findAllByProductId(Long productId);
    List<Cart> findAllByProductType(ProductType productType);
}
