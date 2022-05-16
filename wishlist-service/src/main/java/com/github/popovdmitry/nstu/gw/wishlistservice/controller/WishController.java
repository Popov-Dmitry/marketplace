package com.github.popovdmitry.nstu.gw.wishlistservice.controller;

import com.github.popovdmitry.nstu.gw.wishlistservice.dto.WishDto;
import com.github.popovdmitry.nstu.gw.wishlistservice.model.Wish;
import com.github.popovdmitry.nstu.gw.wishlistservice.service.WishService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WishController {

    private final WishService wishService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Wish> createWish(@RequestBody WishDto wishDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(wishService.saveWish(wishDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<List<Wish>> getWishlistByCustomerId(@PathVariable Long id) {
        return ResponseEntity.ok(wishService.findAllByCustomerId(id));
    }

    @GetMapping(value = "/sellers/{id}", produces = "application/json")
    public ResponseEntity<List<Wish>> getWishlistBySellerId(@PathVariable Long id) {
        return ResponseEntity.ok(wishService.findAllBySellerId(id));
    }

    @GetMapping(value = "/products/{detailsId}", produces = "application/json")
    public ResponseEntity<List<Wish>> getWishlistByProductDetailsId(@PathVariable Long detailsId) {
        return ResponseEntity.ok(wishService.findAllByProductDetailsId(detailsId));
    }

    @GetMapping(value = "/products/{detailsId}/{id}", produces = "application/json")
    public ResponseEntity<List<Wish>> getWishlistByProductId(@PathVariable Long detailsId,
                                                             @PathVariable Long id) {
        return ResponseEntity.ok(wishService.findAllByProductId(id));
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<?> deleteWish(@PathVariable Long id) throws NotFoundException {
        wishService.deleteWish(id);
        return ResponseEntity.ok().build();
    }
}
