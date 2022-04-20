package com.github.popovdmitry.nstu.gw.clothesproductservice.controller;

import com.github.popovdmitry.nstu.gw.clothesproductservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.*;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Clothes;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.ClothesDetails;
import com.github.popovdmitry.nstu.gw.clothesproductservice.service.ClothesProductService;
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

import java.util.List;

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
    public ResponseEntity<Clothes> getClothes(@Parameter(description = "Clothes details id", required = true, example = "123")
                                                  @PathVariable Long clothesDetailsId,
                                              @Parameter(description = "Clothes id", required = true, example = "10")
                                                  @PathVariable Long clothesId)
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
    public ResponseEntity<List<Clothes>> getAll(@Parameter(description = "Clothes details id", required = true, example = "123")
                                                    @PathVariable Long clothesDetailsId) throws NotFoundException {
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
    public ResponseEntity<Clothes> saveClothes(@Parameter(description = "Clothes product dto", required = true)
                                                   @RequestBody ClothesProductDto clothesProductDto) throws NotFoundException {
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
    public ResponseEntity<Clothes> updateClothes(@Parameter(description = "Clothes details id", required = true, example = "123")
                                                     @PathVariable Long clothesDetailsId,
                                                 @Parameter(description = "Clothes id", required = true, example = "10")
                                                     @PathVariable Long clothesId,
                                                 @Parameter(description = "Clothes dto", required = true)
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
    public ResponseEntity<ClothesDetails> updateClothesDetails(@Parameter(description = "Clothes details id", required = true, example = "123")
                                                                   @PathVariable Long clothesDetailsId,
                                                               @Parameter(description = "Clothes details dto", required = true)
                                                                   @RequestBody ClothesDetailsDto clothesDetailsDto)
            throws NotFoundException {
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
    public ResponseEntity<?> deleteClothes(@Parameter(description = "Clothes details id", required = true, example = "123")
                                               @PathVariable Long clothesDetailsId,
                                           @Parameter(description = "Clothes id", required = true, example = "10")
                                               @PathVariable Long clothesId)
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
    public ResponseEntity<?> deleteClothesDetails(@Parameter(description = "Clothes details id", required = true, example = "123")
                                                      @PathVariable Long clothesDetailsId) throws NotFoundException {
        clothesProductService.deleteClothesDetails(clothesDetailsId);
        return ResponseEntity.ok().build();
    }


    @PostMapping(value = "/search", consumes = "application/json", produces = "application/json")
    @Operation(summary = "Search clothes by filter")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST")
    })
    public ResponseEntity<List<ClothesDetails>> searchAll(@Parameter(description = "Search clothes product dto", required = true)
                                                                            @RequestBody SearchClothesProductDto searchClothesProductDto) {
        log.debug(searchClothesProductDto.toString());
        return ResponseEntity.ok(clothesProductService.findBySearchClothesProductDto(searchClothesProductDto));
    }

    @GetMapping(value = "/search/info", produces = "application/json")
    @Operation(summary = "Get distinct brands colors and types")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST")
    })
    public ResponseEntity<BrandsColorsTypesDistinctDto> getBrandsColorsTypesDistinct() {
        return ResponseEntity.ok(clothesProductService.findBrandsColorsTypesDistinct());
    }
}
