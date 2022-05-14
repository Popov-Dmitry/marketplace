package com.github.popovdmitry.nstu.gw.deliveryservice.service;

import com.github.popovdmitry.nstu.gw.deliveryservice.dto.DeliveryDto;
import com.github.popovdmitry.nstu.gw.deliveryservice.model.Delivery;
import com.github.popovdmitry.nstu.gw.deliveryservice.repository.DeliveryRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    public Delivery findById(Long id) throws NotFoundException {
        return deliveryRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Delivery with id %d is not found", id)));
    }

    public List<Delivery> findBySellerId(Long sellerId) {
        return deliveryRepository.findAllBySellerId(sellerId);
    }

    public Delivery saveDelivery(DeliveryDto deliveryDto) {
        Delivery delivery = new Delivery();
        delivery.setDeliveryVariant(deliveryDto.getDeliveryVariant());
        delivery.setDeliveryPriceIncluded(deliveryDto.getDeliveryPriceIncluded());
        delivery.setDeliveryPrice(deliveryDto.getDeliveryPrice());
        delivery.setDeliveryPriceVariant(deliveryDto.getDeliveryPriceVariant());
        delivery.setDepartureIndex(deliveryDto.getDepartureIndex());
        delivery.setReturnIndex(deliveryDto.getReturnIndex());
        delivery.setPackVariant(deliveryDto.getPackVariant());
        delivery.setService(deliveryDto.getService());
        delivery.setSellerId(deliveryDto.getSellerId());
        return deliveryRepository.save(delivery);
    }
}
