package com.github.popovdmitry.nstu.gw.cartservice.controller;

import com.github.popovdmitry.nstu.gw.cartservice.dto.CartDto;
import com.github.popovdmitry.nstu.gw.cartservice.dto.ProductCountDto;
import com.github.popovdmitry.nstu.gw.cartservice.service.CartService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CartController {

    private final CartService cartService;

    @GetMapping("/{cartId}")
    public ResponseEntity<?> getCart(@PathVariable Long cartId) {
        try {
            return ResponseEntity.ok(cartService.findById(cartId));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> saveCart(CartDto cartDto) {
        try {
            return ResponseEntity.ok(cartService.saveCart(cartDto));
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping("/{cartId}")
    public ResponseEntity<?> updateCart(@PathVariable Long cartId, ProductCountDto productCountDto) {
        try {
            return ResponseEntity.ok(cartService.updateCart(cartId, productCountDto));
        }
        catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<?> deleteCart(@PathVariable Long cartId) {
        try {
            cartService.deleteCart(cartId);
            return ResponseEntity.ok().build();
        }
        catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
