package com.github.popovdmitry.gw.verificationservice.controller;

import com.github.popovdmitry.gw.verificationservice.config.Swagger2Config;
import com.github.popovdmitry.gw.verificationservice.dto.VerificationVerdictDto;
import com.github.popovdmitry.gw.verificationservice.model.SellerInfo;
import com.github.popovdmitry.gw.verificationservice.service.SellerInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@Api(tags = {Swagger2Config.TAG_VERIFICATION})
public class SellerInfoController {

    private final SellerInfoService sellerInfoService;

    @GetMapping(produces = "application/json")
    @Operation(summary = "Get all sellers info")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
    })
    public ResponseEntity<List<SellerInfo>> getAllSellersInfo() {
        return ResponseEntity.ok(sellerInfoService.getAll());
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Get seller info by sellerInfo id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<SellerInfo> getSellerInfo(@Parameter(description = "Seller sellerInfo id", required = true, example = "123")
                                                        @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(sellerInfoService.findById(id));
    }

    @PostMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update seller status by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> updateSellerStatus(@Parameter(description = "Seller sellerInfo id", required = true, example = "123")
                                                    @PathVariable Long id,
                                                @Parameter(description = "Verification verdict dto", required = true)
                                                @RequestBody VerificationVerdictDto verificationVerdictDto)
            throws NotFoundException {
        sellerInfoService.deleteSellerInfo(id, verificationVerdictDto);
        return ResponseEntity.ok().build();
    }
}
