package com.github.popovdmitry.nstu.gw.wishlistservice.controller;

import com.github.popovdmitry.nstu.gw.wishlistservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.wishlistservice.dto.WishDto;
import com.github.popovdmitry.nstu.gw.wishlistservice.model.Wish;
import com.github.popovdmitry.nstu.gw.wishlistservice.service.WishService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityExistsException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(tags = {Swagger2Config.TAG_WISHLIST})
public class WishController {

    private final WishService wishService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create wish")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 409, message = "CONFLICT")
    })
    public ResponseEntity<Wish> createWish(@Parameter(description = "Wish dto", required = true)
                                               @RequestBody WishDto wishDto) throws EntityExistsException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(wishService.saveWish(wishDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Get wishlist by customer id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<Wish>> getWishlistByCustomerId(@Parameter(description = "Customer id", required = true, example = "111")
                                                                  @PathVariable Long id) {
        return ResponseEntity.ok(wishService.findAllByCustomerId(id));
    }

    @GetMapping(value = "/sellers/{id}", produces = "application/json")
    @Operation(summary = "Get wishlist by seller id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<Wish>> getWishlistBySellerId(@Parameter(description = "Seller id", required = true, example = "555")
                                                                @PathVariable Long id) {
        return ResponseEntity.ok(wishService.findAllBySellerId(id));
    }

    @GetMapping(value = "/products/{detailsId}", produces = "application/json")
    @Operation(summary = "Get wishlist by product details id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<Wish>> getWishlistByProductDetailsId(@Parameter(description = "Product details id", required = true, example = "123")
                                                                        @PathVariable Long detailsId) {
        return ResponseEntity.ok(wishService.findAllByProductDetailsId(detailsId));
    }

    @GetMapping(value = "/products/{detailsId}/{id}", produces = "application/json")
    @Operation(summary = "Get wishlist by product id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<Wish>> getWishlistByProductId(@Parameter(description = "Product details id", required = true, example = "123")
                                                                 @PathVariable Long detailsId,
                                                             @Parameter(description = "Product id", required = true, example = "321")
                                                                 @PathVariable Long id) {
        return ResponseEntity.ok(wishService.findAllByProductId(id));
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Delete wish by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> deleteWish(@Parameter(description = "Wish id", required = true, example = "1245")
                                            @PathVariable Long id) throws NotFoundException {
        wishService.deleteWish(id);
        return ResponseEntity.ok().build();
    }
}
