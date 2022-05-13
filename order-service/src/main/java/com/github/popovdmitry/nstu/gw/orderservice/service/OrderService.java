package com.github.popovdmitry.nstu.gw.orderservice.service;

import com.github.popovdmitry.nstu.gw.orderservice.dto.KafkaOrderDto;
import com.github.popovdmitry.nstu.gw.orderservice.dto.OrderDto;
import com.github.popovdmitry.nstu.gw.orderservice.dto.OrderStatusDto;
import com.github.popovdmitry.nstu.gw.orderservice.model.Order;
import com.github.popovdmitry.nstu.gw.orderservice.model.ProductType;
import com.github.popovdmitry.nstu.gw.orderservice.model.Status;
import com.github.popovdmitry.nstu.gw.orderservice.repository.OrderRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    @Value("${kafka.topic.producer.order-clothes-topic}")
    private String orderClothesTopic;

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, KafkaOrderDto> kafkaTemplate;

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
        order.setProductType(orderDto.getProductType());
        order.setRegularPrice(orderDto.getRegularPrice());
        order.setPrice(orderDto.getPrice());
        order.setTitle(orderDto.getTitle());
        order.setVariant(orderDto.getVariant());
        try {
            Order savedOrder = orderRepository.save(order);
            if (savedOrder.getProductType() == ProductType.CLOTHES) {
                kafkaTemplate.send
                        (orderClothesTopic,
                                savedOrder.getId().toString(),
                                new KafkaOrderDto(
                                        savedOrder.getProductDetailsId(),
                                        savedOrder.getProductId(),
                                        savedOrder.getCount()
                                )
                        );
            }
            return savedOrder;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Order updateOrderStatus(Long id, OrderStatusDto orderStatusDto) throws NotFoundException {
        Order order = orderRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Order with id %d id not found", id)));
        order.setStatus(orderStatusDto.getStatus());
        try {
            Order savedOrder = orderRepository.save(order);
            if ((savedOrder.getStatus() == Status.CANCELED || savedOrder.getStatus() == Status.RETURNED)
                    && savedOrder.getProductType() == ProductType.CLOTHES) {
                kafkaTemplate.send
                        (orderClothesTopic,
                                savedOrder.getId().toString(),
                                new KafkaOrderDto(
                                        savedOrder.getProductDetailsId(),
                                        savedOrder.getProductId(),
                                        savedOrder.getCount() * -1
                                )
                        );
            }
            return savedOrder;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
