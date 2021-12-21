package com.github.popovdmitry.nstu.gw.cartservice.service;

import com.github.popovdmitry.nstu.gw.cartservice.dto.CartDto;
import com.github.popovdmitry.nstu.gw.cartservice.dto.ProductCountDto;
import com.github.popovdmitry.nstu.gw.cartservice.model.Cart;
import com.github.popovdmitry.nstu.gw.cartservice.repository.CartRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {

    private final CartRepository cartRepository;

    public List<Cart> findAllByCustomerId(Long customerId) {
        return cartRepository.findAllByCustomerId(customerId);
    }

    public List<Cart> findAllByProductId(Long productId) {
        return cartRepository.findAllByProductId(productId);
    }

    public Cart saveCart(CartDto cartDto) throws IllegalArgumentException {
        if (Objects.isNull(cartDto.getCustomerId()) || Objects.isNull(cartDto.getProductType()) ||
                Objects.isNull(cartDto.getProductId()) || Objects.isNull(cartDto.getCount()) ||
                cartDto.getCustomerId() < 0 || cartDto.getProductId() < 0 || cartDto.getCount() < 0) {
            throw new IllegalArgumentException();
        }
        Cart cart = new Cart();
        cart.setCustomerId(cart.getCustomerId());
        cart.setProductType(cartDto.getProductType());
        cart.setProductId(cartDto.getProductId());
        cart.setCount(cartDto.getCount());
        return cartRepository.save(cart);
    }

    public Cart updateCart(Long cartId, ProductCountDto productCountDto) throws IllegalArgumentException, NotFoundException {
        if (Objects.isNull(productCountDto.getCount()) || productCountDto.getCount() < 0 || cartId < 0) {
            throw new IllegalArgumentException();
        }
        Cart cart = cartRepository.findById(cartId).orElseThrow(() ->
                new NotFoundException(String.format("Cart with id %d is not found", cartId)));
        cart.setCount(productCountDto.getCount());
        return cartRepository.save(cart);
    }

    public void deleteCart(Long cartId) throws NotFoundException {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() ->
                new NotFoundException(String.format("Cart with id %d is not found", cartId)));
        cartRepository.delete(cart);
    }
}
