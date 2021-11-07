package com.github.popovdmitry.nstu.gw.moderservice.controller;

import com.github.popovdmitry.nstu.gw.moderservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.moderservice.dto.ModerDto;
import com.github.popovdmitry.nstu.gw.moderservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.moderservice.model.Moder;
import com.github.popovdmitry.nstu.gw.moderservice.service.ModerService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ModerController {
    
    private final ModerService moderService;

    @PostMapping("/")
    public ResponseEntity<?> createModer(@RequestBody Moder moder) {
        try {
            moderService.saveModer(moder);
            return ResponseEntity.status(HttpStatus.CREATED).body(moder);
        } catch (NotUniqueEmailException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getModer(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(moderService.findById(id));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateModer(@PathVariable Long id, @RequestBody ModerDto updatedModer) {
        try {
            return ResponseEntity.ok(moderService.updateModer(id, updatedModer));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModer(@PathVariable Long id) {
        try {
            moderService.deleteModer(id);
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email) {
        try {
            return ResponseEntity.ok(new EncodedPasswordDto(moderService.findByEmail(email).getPassword()));
        }
        catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
