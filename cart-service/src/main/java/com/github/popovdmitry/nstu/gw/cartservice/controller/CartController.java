package com.github.popovdmitry.nstu.gw.cartservice.controller;

import com.github.popovdmitry.nstu.gw.cartservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.cartservice.dto.CartDto;
import com.github.popovdmitry.nstu.gw.cartservice.dto.ProductCountDto;
import com.github.popovdmitry.nstu.gw.cartservice.service.CartService;
import io.swagger.annotations.Api;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(tags = {Swagger2Config.TAG_CART})
public class CartController {

    private final CartService cartService;

    @GetMapping("/{cartId}")
    public ResponseEntity<?> getCart(@PathVariable Long cartId) throws NotFoundException {
        return ResponseEntity.ok(cartService.findById(cartId));
    }

    @PostMapping("/")
    public ResponseEntity<?> saveCart(@RequestBody CartDto cartDto) throws IllegalArgumentException {
        return ResponseEntity.ok(cartService.saveCart(cartDto));
    }

    @PatchMapping("/{cartId}")
    public ResponseEntity<?> updateCart(@PathVariable Long cartId, @RequestBody ProductCountDto productCountDto)
            throws IllegalArgumentException, NotFoundException {
        return ResponseEntity.ok(cartService.updateCart(cartId, productCountDto));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<?> deleteCart(@PathVariable Long cartId) throws NotFoundException {
        cartService.deleteCart(cartId);
        return ResponseEntity.ok().build();
    }
}
