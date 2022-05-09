package com.github.popovdmitry.nstu.gw.orderservice.service;

import com.github.popovdmitry.nstu.gw.orderservice.dto.OrderDto;
import com.github.popovdmitry.nstu.gw.orderservice.dto.OrderStatusDto;
import com.github.popovdmitry.nstu.gw.orderservice.model.Order;
import com.github.popovdmitry.nstu.gw.orderservice.model.Status;
import com.github.popovdmitry.nstu.gw.orderservice.repository.OrderRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private OrderRepository orderRepository;

    public List<Order> findAllByCustomerId(Long customerId) {
        return orderRepository.findAllByCustomerId(customerId);
    }
    public List<Order> findAllBySellerId(Long sellerId) {
        return orderRepository.findAllBySellerId(sellerId);
    }
    public List<Order> findAllByProductId(Long productId) {
        return orderRepository.findAllByProductId(productId);
    }
    public List<Order> findAllByProductDetailsId(Long productDetailsId) {
        return orderRepository.findAllByProductDetailsId(productDetailsId);
    }

    public Order findById(Long id) throws NotFoundException {
        return orderRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Order with id %d is not found", id)));
    }

    public Order saveOrder(OrderDto orderDto) {
        Order order = new Order();
        order.setProductDetailsId(orderDto.getProductDetailsId());
        order.setProductId(orderDto.getProductId());
        order.setCount(orderDto.getCount());
        order.setCustomerId(orderDto.getCustomerId());
        order.setAddress(orderDto.getAddress());
        order.setSellerId(orderDto.getSellerId());
        order.setStatus(Status.CREATED);
        order.setOrderDate(new Date());
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(Long id, OrderStatusDto orderStatusDto) throws NotFoundException {
        Order order = orderRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Order with id %d id not found", id)));
        order.setStatus(orderStatusDto.getStatus());
        return orderRepository.save(order);
    }
}
