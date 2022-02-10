package com.github.popovdmitry.nstu.gw.sellerservice.controller;

import com.github.popovdmitry.nstu.gw.sellerservice.dto.EncodedPasswordDto;
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
    public ResponseEntity<?> createSeller(@RequestBody NewSellerDto newSellerDto)
            throws NotUniqueEmailException, NotUniqueShopNameException, NotUniqueInnException {
        return ResponseEntity.status(HttpStatus.CREATED).body(sellerService.saveSeller(newSellerDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSeller(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(sellerService.findById(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateSeller(@PathVariable Long id, @RequestBody SellerDto sellerDto) throws NotFoundException {
        return ResponseEntity.ok(sellerService.updateSeller(id, sellerDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeller(@PathVariable Long id) throws NotFoundException {
        sellerService.deleteSeller(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchSeller(@RequestParam(required = false) String email,
                                          @RequestParam(required = false) String shopName,
                                          @RequestParam(required = false) String inn,
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
    public ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email) {
        try {
            return ResponseEntity.ok(new EncodedPasswordDto(sellerService.findByEmail(email).getPassword()));
        }
        catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}