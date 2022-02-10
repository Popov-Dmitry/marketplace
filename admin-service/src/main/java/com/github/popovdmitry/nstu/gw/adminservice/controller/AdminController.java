package com.github.popovdmitry.nstu.gw.adminservice.controller;

import com.github.popovdmitry.nstu.gw.adminservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.adminservice.dto.AdminDto;
import com.github.popovdmitry.nstu.gw.adminservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.adminservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.adminservice.model.Admin;
import com.github.popovdmitry.nstu.gw.adminservice.service.AdminService;
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
@Api(tags = {Swagger2Config.TAG_ADMIN})
public class AdminController {
    
    private final AdminService adminService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create admin")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 409, message = "CONFLICT")
    })
    public ResponseEntity<Admin> createAdmin(@Parameter(description = "Admin dto", required = true)
                                                 @RequestBody AdminDto adminDto) throws NotUniqueEmailException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adminService.saveAdmin(adminDto));
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Get admin by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Admin> getAdmin(@Parameter(description = "Admin id", required = true, example = "123")
                                              @PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(adminService.findById(id));
    }

    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update admin by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<Admin> updateAdmin(@Parameter(description = "Admin id", required = true, example = "123")
                                                 @PathVariable Long id,
                                             @Parameter(description = "Admin dto", required = true)
                                             @RequestBody AdminDto adminDto) throws NotFoundException {
        return ResponseEntity.ok(adminService.updateAdmin(id, adminDto));
    }

    @DeleteMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "Delete admin by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<?> deleteAdmin(@Parameter(description = "Admin id", required = true, example = "123")
                                             @PathVariable Long id) throws NotFoundException {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @ApiIgnore
    public ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email)
            throws NotFoundException {
        return ResponseEntity.ok(new EncodedPasswordDto(adminService.findByEmail(email).getPassword()));
    }
}
