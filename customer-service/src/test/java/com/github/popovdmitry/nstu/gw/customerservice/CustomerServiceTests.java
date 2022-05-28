package com.github.popovdmitry.nstu.gw.customerservice;

import com.github.popovdmitry.nstu.gw.customerservice.dto.CustomerDto;
import com.github.popovdmitry.nstu.gw.customerservice.model.Customer;
import com.github.popovdmitry.nstu.gw.customerservice.model.Sex;
import com.github.popovdmitry.nstu.gw.customerservice.repository.CustomerRepository;
import com.github.popovdmitry.nstu.gw.customerservice.service.CustomerService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

@SpringBootTest
class CustomerServiceTests {

    @Autowired
    private CustomerService customerService;

    @MockBean
    private CustomerRepository customerRepository;

    @Test
    void addCustomer() throws Exception {
        CustomerDto customerDto = new CustomerDto("first", "second", "email@te.st",
                "password", Sex.MALE, 1, 1, 2000);
        Customer customer = new Customer(1L, "first", "second", "email@te.st",
                "password", Sex.MALE, 1, 1, 2000);

        Mockito.when(customerRepository.save(ArgumentMatchers.any(Customer.class)))
                .thenReturn(customer);

        Customer savedCustomer = customerService.saveCustomer(customerDto);

        Assertions.assertNotNull(savedCustomer);
        Assertions.assertNotNull(savedCustomer.getId());
        Mockito.verify(customerRepository, Mockito.times(1))
                .save(ArgumentMatchers.any(Customer.class));
    }

    @Test
    void findCustomerById() throws Exception {
        Customer customer = new Customer(1L, "first", "second", "email@te.st",
                "password", Sex.MALE, 1, 1, 2000);

        Mockito.when(customerRepository.findById(1L))
                .thenReturn(Optional.of(customer));

        Customer c = customerService.findById(1L);

        Assertions.assertNotNull(c);
        Mockito.verify(customerRepository, Mockito.times(1))
                .findById(ArgumentMatchers.any(Long.class));
    }

    @Test
    void findCustomerByEmail() throws Exception {
        Customer customer = new Customer(1L, "first", "second", "email@te.st",
                "password", Sex.MALE, 1, 1, 2000);

        Mockito.when(customerRepository.findCustomerByEmail(customer.getEmail()))
                .thenReturn(Optional.of(customer));

        Customer c = customerService.findByEmail(customer.getEmail());

        Assertions.assertNotNull(c);
        Assertions.assertEquals(customer.getEmail(), c.getEmail());
        Mockito.verify(customerRepository, Mockito.times(1))
                .findCustomerByEmail(ArgumentMatchers.any(String.class));
    }

    @Test
    void updateCustomer() throws Exception {
        CustomerDto customerDto = new CustomerDto("first", "second", "email@te.st",
                "updatedPassword", Sex.MALE, 1, 1, 2000);
        Customer customer = new Customer(1L, "first", "second", "email@te.st",
                "password", Sex.MALE, 1, 1, 2000);

        Mockito.when(customerRepository.findById(1L))
                .thenReturn(Optional.of(customer));
        Mockito.when(customerRepository.save(ArgumentMatchers.any(Customer.class)))
                .thenReturn(customer);

        Customer c = customerService.updateCustomer(customer.getId(), customerDto);

        Assertions.assertNotNull(c);
        Mockito.verify(customerRepository, Mockito.times(1))
                .findById(ArgumentMatchers.any(Long.class));
        Mockito.verify(customerRepository, Mockito.times(1))
                .save(ArgumentMatchers.any(Customer.class));
    }

    @Test
    void deleteCustomer() throws Exception {
        Customer customer = new Customer(1L, "first", "second", "email@te.st",
                "password", Sex.MALE, 1, 1, 2000);

        Mockito.when(customerRepository.findById(1L))
                .thenReturn(Optional.of(customer));

        customerService.deleteCustomer(1L);

        Mockito.verify(customerRepository, Mockito.times(1))
                .findById(ArgumentMatchers.any(Long.class));
        Mockito.verify(customerRepository, Mockito.times(1))
                .delete(ArgumentMatchers.any(Customer.class));
    }

}
