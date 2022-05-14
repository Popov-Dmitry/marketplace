package com.github.popovdmitry.nstu.gw.deliveryservice.controller;

import com.github.popovdmitry.nstu.gw.deliveryservice.dto.DeliveryDto;
import com.github.popovdmitry.nstu.gw.deliveryservice.model.Delivery;
import com.github.popovdmitry.nstu.gw.deliveryservice.service.DeliveryService;
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

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class DeliveryController {

    private final DeliveryService deliveryService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create delivery")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Delivery> createDelivery(@Parameter(description = "Delivery dto", required = true)
                                                       @RequestBody DeliveryDto deliveryDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(deliveryService.saveDelivery(deliveryDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Get delivery by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<Delivery> getDeliveryById(@Parameter(description = "Delivery id", required = true, example = "123")
                                                        @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(deliveryService.findById(id));
    }

    @GetMapping(value = "/seller/{id}", produces = "application/json")
    @Operation(summary = "Get all deliveries by seller id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<Delivery>> getDeliveriesBySellerId(@Parameter(description = "Seller id", required = true, example = "123")
                                                                @PathVariable Long id) {
        return ResponseEntity.ok(deliveryService.findBySellerId(id));
    }
}
