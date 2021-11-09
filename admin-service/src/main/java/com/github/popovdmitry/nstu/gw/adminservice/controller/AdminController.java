package com.github.popovdmitry.nstu.gw.adminservice.controller;

import com.github.popovdmitry.nstu.gw.adminservice.dto.AdminDto;
import com.github.popovdmitry.nstu.gw.adminservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.adminservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.adminservice.model.Admin;
import com.github.popovdmitry.nstu.gw.adminservice.service.AdminService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
public class AdminController {
    
    private final AdminService adminService;

    @PostMapping("/")
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
        try {
            adminService.saveAdmin(admin);
            return ResponseEntity.status(HttpStatus.CREATED).body(admin);
        } catch (NotUniqueEmailException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdmin(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(adminService.findById(id));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Long id, @RequestBody AdminDto adminDto) {
        try {
            return ResponseEntity.ok(adminService.updateAdmin(id, adminDto));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        try {
            adminService.deleteAdmin(id);
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email) {
        try {
            return ResponseEntity.ok(new EncodedPasswordDto(adminService.findByEmail(email).getPassword()));
        }
        catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
