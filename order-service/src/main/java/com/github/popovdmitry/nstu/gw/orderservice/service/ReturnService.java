package com.github.popovdmitry.nstu.gw.orderservice.service;

import com.github.popovdmitry.nstu.gw.orderservice.dto.ReturnDto;
import com.github.popovdmitry.nstu.gw.orderservice.exception.BadStatusException;
import com.github.popovdmitry.nstu.gw.orderservice.exception.ReturnTimeExpiredException;
import com.github.popovdmitry.nstu.gw.orderservice.model.Order;
import com.github.popovdmitry.nstu.gw.orderservice.model.Return;
import com.github.popovdmitry.nstu.gw.orderservice.model.Status;
import com.github.popovdmitry.nstu.gw.orderservice.repository.ReturnRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReturnService {

    private final ReturnRepository returnRepository;
    private final OrderService orderService;

    public Return findById(Long id) throws NotFoundException {
        return returnRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Return with id %d id not found", id)));
    }

    public Return findByOrderId(Long id) throws NotFoundException {
        Order order = orderService.findById(id);
        return returnRepository.findByOrder(order).orElseThrow(() ->
                new NotFoundException(String.format("Return with order id %d id not found", id)));
    }

    public Return saveReturn(ReturnDto returnDto) throws NotFoundException, BadStatusException, ReturnTimeExpiredException {
        Order order = orderService.findById(returnDto.getOrderId());
        if (order.getStatus() != Status.DELIVERED) {
            throw new BadStatusException("To return the product status must be DELIVERED");
        }
        if ((new Date().getTime() - order.getOrderDate().getTime()) / (24 * 60 * 60 * 1000) > 14) {
            throw new ReturnTimeExpiredException("Products can only be returned within 14 days");
        }
        Return aReturn = new Return();
        aReturn.setReason(returnDto.getReason());
        aReturn.setDescription(returnDto.getDescription());
        order.setStatus(Status.RETURN);
        aReturn.setOrder(order);
        return returnRepository.save(aReturn);
    }
}
