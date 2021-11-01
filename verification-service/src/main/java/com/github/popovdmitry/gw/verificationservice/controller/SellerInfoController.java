package com.github.popovdmitry.gw.verificationservice.controller;

import com.github.popovdmitry.gw.verificationservice.dto.VerificationVerdictDto;
import com.github.popovdmitry.gw.verificationservice.service.SellerInfoService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
public class SellerInfoController {

    private final SellerInfoService sellerInfoService;


    @GetMapping
    public ResponseEntity<?> getAllSellersInfo() {
        return ResponseEntity.ok(sellerInfoService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSellerInfo(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(sellerInfoService.findById(id));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateSellerStatus(@PathVariable Long id,
                                                @RequestBody VerificationVerdictDto verificationVerdictDto) {
        try {
            sellerInfoService.deleteSellerInfo(id, verificationVerdictDto);
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
