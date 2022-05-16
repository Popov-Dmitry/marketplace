package com.github.popovdmitry.nstu.gw.wishlistservice.service;

import com.github.popovdmitry.nstu.gw.wishlistservice.dto.WishDto;
import com.github.popovdmitry.nstu.gw.wishlistservice.model.Wish;
import com.github.popovdmitry.nstu.gw.wishlistservice.repository.WishRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WishService {

    private final WishRepository wishRepository;

    public Wish findById(Long id) throws NotFoundException {
        return wishRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Wish with id %d is not found", id)));
    }

    public Wish findByProductId(Long productId) throws NotFoundException {
        return wishRepository.findByProductId(productId).orElseThrow(() ->
                new NotFoundException(String.format("Wish with product id %d is not found", productId)));
    }

    public List<Wish> findAllByCustomerId(Long customerId) {
        return wishRepository.findAllByCustomerId(customerId);
    }

    public List<Wish> findAllBySellerId(Long sellerId) {
        return wishRepository.findAllBySellerId(sellerId);
    }

    public List<Wish> findAllByProductDetailsId(Long productDetailsId) {
        return wishRepository.findAllByProductDetailsId(productDetailsId);
    }

    public List<Wish> findAllByProductId(Long productId) {
        return wishRepository.findAllByProductId(productId);
    }

    public Wish saveWish(WishDto wishDto) {
        if (wishRepository.findByCustomerIdAndProductTypeAndProductId(
                wishDto.getCustomerId(), wishDto.getProductType(), wishDto.getProductId()).isEmpty()) {
            Wish wish = new Wish();
            wish.setProductType(wishDto.getProductType());
            wish.setProductDetailsId(wishDto.getProductDetailsId());
            wish.setProductId(wishDto.getProductId());
            wish.setCustomerId(wishDto.getCustomerId());
            wish.setSellerId(wishDto.getSellerId());
            return wishRepository.save(wish);
        }
        throw new EntityExistsException(
                String.format("Product %s/%d/%d is already exists in wishlist at customer with id %d",
                        wishDto.getProductType().name(), wishDto.getProductDetailsId(),
                        wishDto.getProductId(), wishDto.getCustomerId()));
    }

    public void deleteWish(Long id) throws NotFoundException {
        Wish wish = wishRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Wish with id %d is not found", id)));
        wishRepository.delete(wish);
    }
}
