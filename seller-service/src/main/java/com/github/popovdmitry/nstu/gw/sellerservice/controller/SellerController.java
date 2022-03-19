package com.github.popovdmitry.nstu.gw.sellerservice.controller;

import com.github.popovdmitry.nstu.gw.sellerservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.sellerservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.sellerservice.dto.NewSellerDto;
import com.github.popovdmitry.nstu.gw.sellerservice.dto.SellerDto;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueInnException;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueShopNameException;
import com.github.popovdmitry.nstu.gw.sellerservice.model.Seller;
import com.github.popovdmitry.nstu.gw.sellerservice.model.VerificationStatus;
import com.github.popovdmitry.nstu.gw.sellerservice.service.SellerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
@Api(tags = {Swagger2Config.TAG_SELLER})
public class SellerController {

    private final SellerService sellerService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create seller")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 409, message = "CONFLICT")
    })
    public ResponseEntity<Seller> createSeller(@Parameter(description = "New seller dto", required = true)
                                                   @RequestBody NewSellerDto newSellerDto)
            throws NotUniqueEmailException, NotUniqueShopNameException, NotUniqueInnException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(sellerService.saveSeller(newSellerDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Get seller by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<Seller> getSeller(@Parameter(description = "Seller id", required = true, example = "123")
                                                @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(sellerService.findById(id));
    }

    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update seller by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<Seller> updateSeller(@Parameter(description = "Seller id", required = true, example = "123")
                                                   @PathVariable Long id,
                                               @Parameter(description = "Seller dto", required = true)
                                                   @RequestBody SellerDto sellerDto) throws NotFoundException {
        return ResponseEntity.ok(sellerService.updateSeller(id, sellerDto));
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Delete seller by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> deleteSeller(@Parameter(description = "Seller id", required = true, example = "123")
                                              @PathVariable Long id) throws NotFoundException {
        sellerService.deleteSeller(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/search", produces = "application/json")
    @Operation(summary = "Search seller")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> searchSeller(@Parameter(description = "Seller email", required = false, example = "123")
                                              @RequestParam(required = false) String email,
                                          @Parameter(description = "Seller shop name", required = false, example = "All Stars")
                                              @RequestParam(required = false) String shopName,
                                          @Parameter(description = "Seller inn", required = false, example = "1234567890")
                                              @RequestParam(required = false) String inn,
                                          @Parameter(description = "Seller verification status", required = false,
                                                  schema = @Schema(allowableValues = {"IN_PROGRESS", "COMPLETED", "FAILED"}))
                                              @RequestParam(required = false) String verificationStatus)
            throws NotFoundException {
        if (Objects.nonNull(email) && !email.isEmpty()) {
            return ResponseEntity.ok(sellerService.findByEmail(email));
        }
        if (Objects.nonNull(shopName) && !shopName.isEmpty()) {
            return ResponseEntity.ok(sellerService.findByShopName(shopName));
        }
        if (Objects.nonNull(inn) && !inn.isEmpty()) {
            return ResponseEntity.ok(sellerService.findByInn(inn));
        }
        if (Objects.nonNull(verificationStatus) && !verificationStatus.isEmpty()) {
            return ResponseEntity.ok(sellerService.findByVerificationStatus(
                    VerificationStatus.valueOf(verificationStatus)));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping
    @ApiIgnore
    public ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email) {
        try {
            return ResponseEntity.ok(new EncodedPasswordDto(sellerService.findByEmail(email).getPassword()));
        }
        catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}