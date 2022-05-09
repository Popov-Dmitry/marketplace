package com.github.popovdmitry.nstu.gw.moderservice.controller;

import com.github.popovdmitry.nstu.gw.moderservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.moderservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.moderservice.dto.ModerDto;
import com.github.popovdmitry.nstu.gw.moderservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.moderservice.model.Moder;
import com.github.popovdmitry.nstu.gw.moderservice.service.ModerService;
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
@Slf4j
@RequiredArgsConstructor
@Api(tags = {Swagger2Config.TAG_MODER})
public class ModerController {
    
    private final ModerService moderService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create moder")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 409, message = "CONFLICT")
    })
    public ResponseEntity<Moder> createModer(@Parameter(description = "Moder dto", required = true)
                                                 @RequestBody ModerDto moderDto) throws NotUniqueEmailException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(moderService.saveModer(moderDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Get moder by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Moder> getModer(@Parameter(description = "Moder id", required = true, example = "123")
                                              @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(moderService.findById(id));
    }

    @GetMapping(produces = "application/json")
    @Operation(summary = "Get moder by email")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<Moder> getSellerByEmail(@Parameter(description = "Moder email", required = true, example = "ivan@company.com")
                                                   @RequestParam("e") String email) throws NotFoundException {
        return ResponseEntity.ok(moderService.findByEmail(email));
    }

    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update moder by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Moder> updateModer(@Parameter(description = "Moder id", required = true, example = "123")
                                                 @PathVariable Long id,
                                             @Parameter(description = "Moder dto", required = true)
                                                 @RequestBody ModerDto updatedModer) throws NotFoundException {
        return ResponseEntity.ok(moderService.updateModer(id, updatedModer));
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Delete moder by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<?> deleteModer(@Parameter(description = "Moder id", required = true, example = "123")
                                             @PathVariable Long id) throws NotFoundException {
        moderService.deleteModer(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @ApiIgnore
    public ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email)
            throws NotFoundException {
        return ResponseEntity.ok(new EncodedPasswordDto(moderService.findByEmail(email).getPassword()));
    }
}
