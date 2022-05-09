package com.github.popovdmitry.nstu.gw.orderservice.controller;

import com.github.popovdmitry.nstu.gw.orderservice.dto.OrderDto;
import com.github.popovdmitry.nstu.gw.orderservice.dto.OrderStatusDto;
import com.github.popovdmitry.nstu.gw.orderservice.model.Order;
import com.github.popovdmitry.nstu.gw.orderservice.service.OrderService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto orderDto) {
        return ResponseEntity.ok(orderService.saveOrder(orderDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(orderService.findById(id));
    }

    @GetMapping(value = "/customers/{id}", produces = "application/json")
    public ResponseEntity<List<Order>> getOrdersByCustomerId(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findAllByCustomerId(id));
    }

    @GetMapping(value = "/sellers/{id}", produces = "application/json")
    public ResponseEntity<List<Order>> getOrdersBySellerId(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findAllBySellerId(id));
    }

    @GetMapping(value = "/products/{detailsId}/{id}", produces = "application/json")
    public ResponseEntity<List<Order>> getOrdersByProductId(@PathVariable Long detailsId, @PathVariable Long id) {
        return ResponseEntity.ok(orderService.findAllByProductId(id));
    }

    @GetMapping(value = "/products/{detailsId}", produces = "application/json")
    public ResponseEntity<List<Order>> getOrdersByProductDetailsId(@PathVariable Long detailsId) {
        return ResponseEntity.ok(orderService.findAllByProductDetailsId(detailsId));
    }

    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody OrderStatusDto orderStatusDto)
            throws NotFoundException {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, orderStatusDto));
    }
}
