package com.github.popovdmitry.nstu.gw.deliveryservice.service;

import com.github.popovdmitry.nstu.gw.deliveryservice.dto.AddressDto;
import com.github.popovdmitry.nstu.gw.deliveryservice.model.Address;
import com.github.popovdmitry.nstu.gw.deliveryservice.repository.AddressRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AddressService {

    private final AddressRepository addressRepository;

    public Address findById(Long id) throws NotFoundException {
        return addressRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Address with id %d is not found", id)));
    }

    public List<Address> findAllByCustomerId(Long id) {
        return addressRepository.findAllByCustomerId(id);
    }

    public Address findByCustomerIdMain(Long id) throws NotFoundException {
        return addressRepository.findByCustomerIdAndIsMain(id, true).orElseThrow(() ->
                new NotFoundException(String.format("Address with id %d is not found", id)));
    }

    public Address saveAddress(AddressDto addressDto) {
        Address address = new Address();
        address.setAddress(addressDto.getAddress());
        address.setIndex(addressDto.getIndex());
        address.setCustomerId(addressDto.getCustomerId());
        List<Address> addresses = findAllByCustomerId(addressDto.getCustomerId());
        if (addresses.isEmpty()) {
            address.setIsMain(true);
        }
        else {
            if (addressDto.getIsMain()) {
                for(Address a : addresses) {
                    if (a.getIsMain()) {
                        a.setIsMain(false);
                        addressRepository.save(a);
                        break;
                    }
                }
                address.setIsMain(true);
            }
            else {
                address.setIsMain(false);
            }
        }
        return addressRepository.save(address);
    }

    public Address updateAddress(Long id, AddressDto addressDto) throws NotFoundException {
        Address address = findById(id);
        if (!addressDto.getAddress().isBlank()) {
            address.setAddress(addressDto.getAddress());
        }
        if (!addressDto.getIndex().isBlank()) {
            address.setIndex(addressDto.getIndex());
        }
        if (addressDto.getIsMain()) {
            Address address1 = findByCustomerIdMain(address.getCustomerId());
            address1.setIsMain(false);
            addressRepository.save(address1);
            address.setIsMain(true);
        }
        return addressRepository.save(address);
    }

    public void deleteAddress(Long id) throws NotFoundException {
        Address address = findById(id);
        if (address.getIsMain()) {
            List<Address> addresses = findAllByCustomerId(address.getCustomerId());
            if (addresses.size() > 1) {
                for(Address a : addresses) {
                    if (!a.getIsMain()) {
                        a.setIsMain(true);
                        addressRepository.save(a);
                        break;
                    }
                }
            }
        }
        addressRepository.delete(address);
    }
}
