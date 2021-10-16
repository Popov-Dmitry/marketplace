package com.github.popovdmitry.nstu.gw.sellerservice.controller;

import com.github.popovdmitry.nstu.gw.sellerservice.dto.NewSellerDto;
import com.github.popovdmitry.nstu.gw.sellerservice.dto.SellerDto;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueInnException;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueShopNameException;
import com.github.popovdmitry.nstu.gw.sellerservice.model.VerificationStatus;
import com.github.popovdmitry.nstu.gw.sellerservice.service.SellerService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
public class SellerController {

    private final SellerService sellerService;

    @PostMapping
    public ResponseEntity<?> createSeller(@RequestBody NewSellerDto newSellerDto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(sellerService.saveSeller(newSellerDto));
        } catch (NotUniqueEmailException | NotUniqueShopNameException | NotUniqueInnException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSeller(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(sellerService.findById(id));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateSeller(@PathVariable Long id, @RequestBody SellerDto sellerDto) {
        try {
            return ResponseEntity.ok(sellerService.updateSeller(id, sellerDto));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeller(@PathVariable Long id) {
        try {
            sellerService.deleteSeller(id);
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchSeller(@RequestParam(required = false) String email,
                                          @RequestParam(required = false) String shopName,
                                          @RequestParam(required = false) String inn,
                                          @RequestParam(required = false) String verificationStatus) {
        if (Objects.nonNull(email) && !email.isEmpty()) {
            try {
                return ResponseEntity.ok(sellerService.findByEmail(email));
            } catch (NotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }
        if (Objects.nonNull(shopName) && !shopName.isEmpty()) {
            try {
                return ResponseEntity.ok(sellerService.findByShopName(shopName));
            } catch (NotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }
        if (Objects.nonNull(inn) && !inn.isEmpty()) {
            try {
                return ResponseEntity.ok(sellerService.findByInn(inn));
            } catch (NotFoundException e) {
                return ResponseEntity.notFound().build();
            }
        }
        if (Objects.nonNull(verificationStatus) && !verificationStatus.isEmpty()) {
            return ResponseEntity.ok(sellerService.findByVerificationStatus(
                    VerificationStatus.valueOf(verificationStatus)));
        }
        return ResponseEntity.badRequest().build();
    }

}