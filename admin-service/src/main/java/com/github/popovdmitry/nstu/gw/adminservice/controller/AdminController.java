package com.github.popovdmitry.nstu.gw.adminservice.controller;

import com.github.popovdmitry.nstu.gw.adminservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.adminservice.dto.AdminDto;
import com.github.popovdmitry.nstu.gw.adminservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.adminservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.adminservice.model.Admin;
import com.github.popovdmitry.nstu.gw.adminservice.service.AdminService;
import io.swagger.annotations.Api;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@Api(tags = {Swagger2Config.TAG_ADMIN})
public class AdminController {
    
    private final AdminService adminService;

    @PostMapping("/")
    public ResponseEntity<Admin> createAdmin(@RequestBody AdminDto adminDto) throws NotUniqueEmailException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(adminService.saveAdmin(adminDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdmin(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(adminService.findById(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id,
                                             @RequestBody AdminDto adminDto) throws NotFoundException {
        return ResponseEntity.ok(adminService.updateAdmin(id, adminDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) throws NotFoundException {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email)
            throws NotFoundException {
        return ResponseEntity.ok(new EncodedPasswordDto(adminService.findByEmail(email).getPassword()));
    }
}
