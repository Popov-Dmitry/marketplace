package com.github.popovdmitry.nstu.gw.orderservice.controller;

import com.github.popovdmitry.nstu.gw.orderservice.dto.ReturnDto;
import com.github.popovdmitry.nstu.gw.orderservice.exception.BadStatusException;
import com.github.popovdmitry.nstu.gw.orderservice.exception.ReturnTimeExpiredException;
import com.github.popovdmitry.nstu.gw.orderservice.model.Return;
import com.github.popovdmitry.nstu.gw.orderservice.service.ReturnService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReturnController {

    private final ReturnService returnService;

    @PostMapping(value = "/returns/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create return")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Return> createReturn(@Parameter(description = "Return dto", required = true)
                                                  @RequestBody ReturnDto returnDto)
            throws NotFoundException, BadStatusException, ReturnTimeExpiredException {
        return ResponseEntity.ok(returnService.saveReturn(returnDto));
    }

    @GetMapping(value = "/returns/{id}", produces = "application/json")
    @Operation(summary = "Get return by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Return> getReturnById(@Parameter(description = "Return id", required = true)
                                                   @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(returnService.findById(id));
    }

    @GetMapping(value = "/{id}/returns", produces = "application/json")
    @Operation(summary = "Get return by order id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Return> getReturnByOrderId(@Parameter(description = "Order id", required = true)
                                                         @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(returnService.findByOrderId(id));
    }
}
