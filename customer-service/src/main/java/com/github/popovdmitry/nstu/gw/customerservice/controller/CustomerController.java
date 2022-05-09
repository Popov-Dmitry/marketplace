package com.github.popovdmitry.nstu.gw.customerservice.controller;

import com.github.popovdmitry.nstu.gw.customerservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.customerservice.dto.CustomerDto;
import com.github.popovdmitry.nstu.gw.customerservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.customerservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.customerservice.model.Customer;
import com.github.popovdmitry.nstu.gw.customerservice.service.CustomerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(tags = {Swagger2Config.TAG_CUSTOMER})
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create customer")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 409, message = "CONFLICT")
    })
    public ResponseEntity<Customer> createCustomer(@Parameter(description = "Customer dto", required = true)
                                                       @RequestBody CustomerDto customerDto) throws NotUniqueEmailException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(customerService.saveCustomer(customerDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Get customer by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<Customer> getCustomer(@Parameter(description = "Customer id", required = true, example = "123")
                                                    @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(customerService.findById(id));
    }

    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update customer by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<Customer> updateCustomer(@Parameter(description = "Customer id", required = true, example = "123")
                                                       @PathVariable Long id,
                                                   @Parameter(description = "Customer dto", required = true)
                                                       @RequestBody CustomerDto updatedCustomer)
            throws NotFoundException {
        return ResponseEntity.ok(customerService.updateCustomer(id, updatedCustomer));
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Delete customer by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> deleteCustomer(@Parameter(description = "Customer id", required = true, example = "123")
                                                @PathVariable Long id) throws NotFoundException {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(produces = "application/json")
    @Operation(summary = "Get customer by email")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<Customer> getCustomerByEmail(@Parameter(description = "Customer email", required = true, example = "ivan@company.com")
                                                           @RequestParam("e") String email) throws NotFoundException {
        return ResponseEntity.ok(customerService.findByEmail(email));
    }

    @GetMapping
    @ApiIgnore
    public ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email)
            throws NotFoundException {
        return ResponseEntity.ok(new EncodedPasswordDto(customerService.findByEmail(email).getPassword()));
    }
}
