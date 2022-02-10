package com.github.popovdmitry.nstu.gw.cartservice.controller;

import com.github.popovdmitry.nstu.gw.cartservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.cartservice.dto.CartDto;
import com.github.popovdmitry.nstu.gw.cartservice.dto.ProductCountDto;
import com.github.popovdmitry.nstu.gw.cartservice.model.Cart;
import com.github.popovdmitry.nstu.gw.cartservice.service.CartService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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

    @GetMapping(value = "/{cartId}", produces = "application/json")
    @Operation(summary = "Get cart by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Cart> getCart(@Parameter(description = "Cart id", required = true, example = "123")
                                         @PathVariable Long cartId) throws NotFoundException {
        return ResponseEntity.ok(cartService.findById(cartId));
    }

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Save cart")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Cart> saveCart(@Parameter(description = "Cart dto", required = true)
                                          @RequestBody CartDto cartDto) throws IllegalArgumentException {
        return ResponseEntity.ok(cartService.saveCart(cartDto));
    }

    @PatchMapping(value = "/{cartId}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update cart by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Cart> updateCart(@Parameter(description = "Cart id", required = true, example = "123")
                                            @PathVariable Long cartId,
                                        @Parameter(description = "Product count dto", required = true)
                                        @RequestBody ProductCountDto productCountDto)
            throws IllegalArgumentException, NotFoundException {
        return ResponseEntity.ok(cartService.updateCart(cartId, productCountDto));
    }

    @DeleteMapping(value = "/{cartId}", produces = "application/json")
    @Operation(summary = "Delete cart by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<?> deleteCart(@Parameter(description = "Cart id", required = true, example = "123")
                                            @PathVariable Long cartId) throws NotFoundException {
        cartService.deleteCart(cartId);
        return ResponseEntity.ok().build();
    }
}
