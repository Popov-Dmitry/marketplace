package com.github.popovdmitry.nstu.gw.deliveryservice.controller;

import com.github.popovdmitry.nstu.gw.deliveryservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.deliveryservice.dto.AddressDto;
import com.github.popovdmitry.nstu.gw.deliveryservice.model.Address;
import com.github.popovdmitry.nstu.gw.deliveryservice.service.AddressService;
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

import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value = "/addresses")
@Api(tags = {Swagger2Config.TAG_DELIVERY})
public class AddressController {

    private final AddressService addressService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create address")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Address> createAddress(@Parameter(description = "Address dto", required = true)
                                                     @RequestBody AddressDto addressDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(addressService.saveAddress(addressDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Get address by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<Address> getAddressById(@Parameter(description = "Address id", required = true, example = "123")
                                                       @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(addressService.findById(id));
    }

    @GetMapping(value = "/customers/{id}", produces = "application/json")
    @Operation(summary = "Get addresses by customer id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<List<Address>> getAddressesByCustomerId(@Parameter(description = "Customer id", required = true, example = "123")
                                                                      @PathVariable Long id,
                                                                  @Parameter(description = "Is main address", required = false, example = "true")
                                                                      @RequestParam(required = false) Boolean isMain) throws NotFoundException {
        if (Objects.nonNull(isMain)) {
            return ResponseEntity.ok(List.of(addressService.findByCustomerIdMain(id)));
        }
        else {
            return ResponseEntity.ok(addressService.findAllByCustomerId(id));
        }
    }

    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update address by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<Address> updateAddress(@Parameter(description = "Address id", required = true, example = "123")
                                                      @PathVariable Long id,
                                                   @Parameter(description = "Address dto", required = true)
                                                      @RequestBody AddressDto addressDto) throws NotFoundException {
        return ResponseEntity.ok(addressService.updateAddress(id, addressDto));
    }

    @DeleteMapping(value = "/{id}")
    @Operation(summary = "Delete address by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> deleteAddress(@Parameter(description = "Address id", required = true, example = "123")
                                               @PathVariable Long id) throws NotFoundException {
        addressService.deleteAddress(id);
        return ResponseEntity.ok().build();
    }
}
