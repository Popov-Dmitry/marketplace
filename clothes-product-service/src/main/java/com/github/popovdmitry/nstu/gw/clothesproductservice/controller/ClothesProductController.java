package com.github.popovdmitry.nstu.gw.clothesproductservice.controller;

import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.ClothesDTO;
import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.ClothesDetailsDto;
import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.ClothesProductDto;
import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.SearchClothesProductDto;
import com.github.popovdmitry.nstu.gw.clothesproductservice.service.ClothesProductService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ClothesProductController {

    private final ClothesProductService clothesProductService;

    @GetMapping("/{clothesDetailsId}/{clothesId}")
    public ResponseEntity<?> getClothes(@PathVariable Long clothesDetailsId, @PathVariable Long clothesId)
            throws NotFoundException {
        return ResponseEntity.ok(clothesProductService.findByClothesId(clothesId));
    }

    @GetMapping("/{clothesDetailsId}")
    public ResponseEntity<?> getAll(@PathVariable Long clothesDetailsId) throws NotFoundException {
        return ResponseEntity.ok(clothesProductService.findAllByClothesDetailsId(clothesDetailsId));
    }

    @PostMapping("/")
    public ResponseEntity<?> saveClothes(@RequestBody ClothesProductDto clothesProductDto) throws NotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(clothesProductService.saveClothes(clothesProductDto));
    }

    @PatchMapping("/{clothesDetailsId}/{clothesId}")
    public ResponseEntity<?> updateClothes(@PathVariable Long clothesDetailsId,
                                           @PathVariable Long clothesId,
                                           @RequestBody ClothesDTO clothesDTO) throws NotFoundException {
        return ResponseEntity.ok(clothesProductService.updateClothes(clothesId, clothesDTO));
    }

    @PatchMapping("/{clothesDetailsId}")
    public ResponseEntity<?> updateClothesDetails(@PathVariable Long clothesDetailsId,
                                           @RequestBody ClothesDetailsDto clothesDetailsDto) throws NotFoundException {
        return ResponseEntity.ok(clothesProductService.updateClothesDetails(clothesDetailsId, clothesDetailsDto));
    }

    @DeleteMapping("/{clothesDetailsId}/{clothesId}")
    public ResponseEntity<?> deleteClothes(@PathVariable Long clothesDetailsId, @PathVariable Long clothesId)
            throws NotFoundException {
        clothesProductService.deleteClothes(clothesId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{clothesDetailsId}")
    public ResponseEntity<?> deleteClothesDetails(@PathVariable Long clothesDetailsId) throws NotFoundException {
        clothesProductService.deleteClothesDetails(clothesDetailsId);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/search")
    public ResponseEntity<?> searchAll(@RequestBody SearchClothesProductDto searchClothesProductDto) {
        log.debug(searchClothesProductDto.toString());
        return ResponseEntity.ok(clothesProductService.findBySearchClothesProductDto(searchClothesProductDto));
    }
}
