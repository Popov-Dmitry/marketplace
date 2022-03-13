package com.github.popovdmitry.nstu.gw.clothesproductservice.controller;

import com.github.popovdmitry.nstu.gw.clothesproductservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.ClothesDTO;
import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.ClothesDetailsDto;
import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.ClothesProductDto;
import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.SearchClothesProductDto;
import com.github.popovdmitry.nstu.gw.clothesproductservice.service.ClothesProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(tags = {Swagger2Config.TAG_CLOTHES})
public class ClothesProductController {

    private final ClothesProductService clothesProductService;

    @GetMapping(value = "/{clothesDetailsId}/{clothesId}", produces = "application/json")
    @Operation(summary = "Get clothes by clothesId")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> getClothes(@PathVariable Long clothesDetailsId, @PathVariable Long clothesId)
            throws NotFoundException {
        return ResponseEntity.ok(clothesProductService.findByClothesId(clothesId));
    }

    @GetMapping(value = "/{clothesDetailsId}", produces = "application/json")
    @Operation(summary = "Get clothes by clothesDetailsId")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> getAll(@PathVariable Long clothesDetailsId) throws NotFoundException {
        return ResponseEntity.ok(clothesProductService.findAllByClothesDetailsId(clothesDetailsId));
    }

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Create clothes")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> saveClothes(@RequestBody ClothesProductDto clothesProductDto) throws NotFoundException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(clothesProductService.saveClothes(clothesProductDto));
    }

    @PatchMapping(value = "/{clothesDetailsId}/{clothesId}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update clothes by clothesId")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> updateClothes(@PathVariable Long clothesDetailsId,
                                           @PathVariable Long clothesId,
                                           @RequestBody ClothesDTO clothesDTO) throws NotFoundException {
        return ResponseEntity.ok(clothesProductService.updateClothes(clothesId, clothesDTO));
    }

    @PatchMapping(value = "/{clothesDetailsId}", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Update clothes details by clothesDetailsId")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> updateClothesDetails(@PathVariable Long clothesDetailsId,
                                           @RequestBody ClothesDetailsDto clothesDetailsDto) throws NotFoundException {
        return ResponseEntity.ok(clothesProductService.updateClothesDetails(clothesDetailsId, clothesDetailsDto));
    }

    @DeleteMapping(value = "/{clothesDetailsId}/{clothesId}", produces = "application/json")
    @Operation(summary = "Delete clothes by clothesId")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> deleteClothes(@PathVariable Long clothesDetailsId, @PathVariable Long clothesId)
            throws NotFoundException {
        clothesProductService.deleteClothes(clothesId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/{clothesDetailsId}", produces = "application/json")
    @Operation(summary = "Delete clothes details by clothesDetailsId")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED"),
            @ApiResponse(code = 404, message = "NOT FOUND")
    })
    public ResponseEntity<?> deleteClothesDetails(@PathVariable Long clothesDetailsId) throws NotFoundException {
        clothesProductService.deleteClothesDetails(clothesDetailsId);
        return ResponseEntity.ok().build();
    }


    @PostMapping(value = "/search", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Search clothes by filter")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
    })
    public ResponseEntity<?> searchAll(@RequestBody SearchClothesProductDto searchClothesProductDto) {
        log.debug(searchClothesProductDto.toString());
        return ResponseEntity.ok(clothesProductService.findBySearchClothesProductDto(searchClothesProductDto));
    }
}
