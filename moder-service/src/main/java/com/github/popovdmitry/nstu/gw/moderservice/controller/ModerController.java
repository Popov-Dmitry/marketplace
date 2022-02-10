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
    public ResponseEntity<?> createModer(@RequestBody Moder moder) throws NotUniqueEmailException {
        return ResponseEntity.status(HttpStatus.CREATED).body(moderService.saveModer(moder));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getModer(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(moderService.findById(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateModer(@PathVariable Long id, @RequestBody ModerDto updatedModer) throws NotFoundException {
        return ResponseEntity.ok(moderService.updateModer(id, updatedModer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModer(@PathVariable Long id) throws NotFoundException {
        moderService.deleteModer(id);
        return ResponseEntity.ok().build();
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
