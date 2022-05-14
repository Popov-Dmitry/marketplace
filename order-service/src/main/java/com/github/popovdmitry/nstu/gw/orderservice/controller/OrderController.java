package com.github.popovdmitry.nstu.gw.orderservice.controller;

import com.github.popovdmitry.nstu.gw.orderservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.orderservice.dto.OrderDto;
import com.github.popovdmitry.nstu.gw.orderservice.dto.OrderStatusDto;
import com.github.popovdmitry.nstu.gw.orderservice.model.Order;
import com.github.popovdmitry.nstu.gw.orderservice.service.OrderService;
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

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(tags = {Swagger2Config.TAG_ORDER})
public class OrderController {

    private final OrderService orderService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create order")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Order> createOrder(@Parameter(description = "Order dto", required = true)
                                                 @RequestBody OrderDto orderDto) {
        return ResponseEntity.ok(orderService.saveOrder(orderDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Get order by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Order> getOrderById(@Parameter(description = "Order id", required = true)
                                                  @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(orderService.findById(id));
    }

    @GetMapping(value = "/customers/{id}", produces = "application/json")
    @Operation(summary = "Get orders by customer id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<Order>> getOrdersByCustomerId(@Parameter(description = "Customer id", required = true)
                                                                 @PathVariable Long id) {
        return ResponseEntity.ok(orderService.findAllByCustomerId(id));
    }

    @GetMapping(value = "/sellers/{id}", produces = "application/json")
    @Operation(summary = "Get orders by seller id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<Order>> getOrdersBySellerId(@Parameter(description = "Seller id", required = true)
                                                               @PathVariable Long id) {
        return ResponseEntity.ok(orderService.findAllBySellerId(id));
    }

    @GetMapping(value = "/products/{detailsId}/{id}", produces = "application/json")
    @Operation(summary = "Get orders by product id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<Order>> getOrdersByProductId(@Parameter(description = "Product details id", required = true)
                                                                @PathVariable Long detailsId,
                                                            @Parameter(description = "Product id", required = true)
                                                                @PathVariable Long id) {
        return ResponseEntity.ok(orderService.findAllByProductId(id));
    }

    @GetMapping(value = "/products/{detailsId}", produces = "application/json")
    @Operation(summary = "Get orders by product details id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<Order>> getOrdersByProductDetailsId(@Parameter(description = "Product details id", required = true)
                                                                       @PathVariable Long detailsId) {
        return ResponseEntity.ok(orderService.findAllByProductDetailsId(detailsId));
    }

    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update order status")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Order> updateOrderStatus(@Parameter(description = "Order id", required = true)
                                                       @PathVariable Long id,
                                                   @Parameter(description = "Order status dto", required = true)
                                                        @RequestBody OrderStatusDto orderStatusDto) throws NotFoundException {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, orderStatusDto));
    }
}
