package com.github.popovdmitry.nstu.gw.customerservice.service;

import com.github.popovdmitry.nstu.gw.customerservice.dto.CustomerDto;
import com.github.popovdmitry.nstu.gw.customerservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.customerservice.model.Customer;
import com.github.popovdmitry.nstu.gw.customerservice.repository.CustomerRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public Customer findById(Long id) throws NotFoundException {
        return customerRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("User with id %d is not found", id)));
    }
    
    public Customer findByEmail(String email) throws NotFoundException {
        return customerRepository.findCustomerByEmail(email).orElseThrow(() ->
                new NotFoundException(String.format("User with email %s is not found", email)));
    }

    public Customer saveCustomer(CustomerDto customerDto) throws NotUniqueEmailException {
        try {
            Customer customer = new Customer();
            customer.setFirstName(customerDto.getFirstName());
            customer.setSecondName(customerDto.getSecondName());
            customer.setEmail(customerDto.getEmail());
            customer.setPassword(bCryptPasswordEncoder.encode(customerDto.getPassword()));
            customer.setSex(customerDto.getSex());
            customer.setBirthDay(customerDto.getBirthDay());
            customer.setBirthMonth(customerDto.getBirthMonth());
            customer.setBirthYear(customerDto.getBirthYear());
            return customerRepository.save(customer);
        }
        catch (Exception e) {
            throw new NotUniqueEmailException(
                    String.format("User with email %s is already exists", customerDto.getEmail()));
        }
    }

    public Customer updateCustomer(Long id, CustomerDto updatedCustomer) throws NotFoundException {
        Customer customer = customerRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("User with id %d is not found", id)));

        if (updatedCustomer.getFirstName() != null && !updatedCustomer.getFirstName().equals("")) {
            customer.setFirstName(updatedCustomer.getFirstName());
        }
        if (updatedCustomer.getSecondName() != null && !updatedCustomer.getSecondName().equals("")) {
            customer.setSecondName(updatedCustomer.getSecondName());
        }
        if (updatedCustomer.getEmail() != null && !updatedCustomer.getEmail().equals("")) {
            customer.setEmail(updatedCustomer.getEmail());
        }
        if (updatedCustomer.getPassword() != null && !updatedCustomer.getPassword().equals("")) {
            customer.setPassword(bCryptPasswordEncoder.encode(updatedCustomer.getPassword()));
        }
        if (updatedCustomer.getSex() != null) {
            customer.setSex(updatedCustomer.getSex());
        }
        if (updatedCustomer.getBirthDay() != null) {
            customer.setBirthDay(updatedCustomer.getBirthDay());
        }
        if (updatedCustomer.getBirthMonth() != null) {
            customer.setBirthMonth(updatedCustomer.getBirthMonth());
        }
        if (updatedCustomer.getBirthYear() != null) {
            customer.setBirthYear(updatedCustomer.getBirthYear());
        }

        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) throws NotFoundException {
        Customer customer = customerRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("User with id %d is not found", id)));
        customerRepository.delete(customer);
    }
}
