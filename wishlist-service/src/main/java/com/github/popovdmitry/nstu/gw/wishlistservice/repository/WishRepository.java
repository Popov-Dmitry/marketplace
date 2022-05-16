package com.github.popovdmitry.nstu.gw.wishlistservice.repository;

import com.github.popovdmitry.nstu.gw.wishlistservice.model.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {
    List<Wish> findAllByCustomerId(Long customerId);
    List<Wish> findAllBySellerId(Long sellerId);
    List<Wish> findAllByProductDetailsId(Long productDetailsId);
    List<Wish> findAllByProductId(Long productId);
    Optional<Wish> findByProductId(Long productId);
}
