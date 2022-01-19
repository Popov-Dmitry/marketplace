package com.github.popovdmitry.nstu.gw.customerservice.controller;

import com.github.popovdmitry.nstu.gw.customerservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.customerservice.dto.CustomerDto;
import com.github.popovdmitry.nstu.gw.customerservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.customerservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.customerservice.model.Customer;
import com.github.popovdmitry.nstu.gw.customerservice.service.CustomerService;
import io.swagger.annotations.Api;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(tags = {Swagger2Config.TAG_CUSTOMER})
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/")
    public ResponseEntity<Customer> createCustomer(@RequestBody CustomerDto customerDto)
            throws NotUniqueEmailException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(customerService.saveCustomer(customerDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(customerService.findById(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id,
                                                   @RequestBody CustomerDto updatedCustomer)
            throws NotFoundException {
        return ResponseEntity.ok(customerService.updateCustomer(id, updatedCustomer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) throws NotFoundException {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email)
            throws NotFoundException {
        return ResponseEntity.ok(new EncodedPasswordDto(customerService.findByEmail(email).getPassword()));
    }
}
