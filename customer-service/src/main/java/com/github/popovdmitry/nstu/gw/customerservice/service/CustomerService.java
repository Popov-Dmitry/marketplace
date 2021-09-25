package com.github.popovdmitry.nstu.gw.customerservice.service;

import com.github.popovdmitry.nstu.gw.customerservice.model.Customer;
import com.github.popovdmitry.nstu.gw.customerservice.repository.CustomerRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    
    private final CustomerRepository customerRepository;

    public Customer findById(Long id) throws NotFoundException {
        return customerRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("User with id %d is not found", id)));
    }
    
    public Customer findByEmail(String email) throws NotFoundException {
        return customerRepository.findCustomerByEmail(email).orElseThrow(() ->
                new NotFoundException(String.format("User with email %s is not found", email)));
    }
}
