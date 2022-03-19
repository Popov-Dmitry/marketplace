package com.github.popovdmitry.nstu.gw.photoservice.controller;

import com.github.popovdmitry.nstu.gw.photoservice.config.Swagger2Config;
import com.github.popovdmitry.nstu.gw.photoservice.model.ProductType;
import com.github.popovdmitry.nstu.gw.photoservice.service.PhotoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(tags = {Swagger2Config.TAG_PHOTO})
public class PhotoController {

    private final PhotoService photoService;

    @PostMapping(value = "/", consumes = "multipart/form-data", produces = "application/json")
    @Operation(summary = "Upload photo")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<?> uploadPhotos(@Parameter(description = "Product type", required = true, example = "CLOTHES")
                                              @RequestParam("productType") ProductType productType,
                                          @Parameter(description = "Product details id", required = true, example = "123")
                                              @RequestParam("detailsId") Long detailsId,
                                          @Parameter(description = "Product id", required = true, example = "11")
                                              @RequestParam("id") Long id,
                                          @Parameter(description = "Product photo (jpeg, jpg, png)", required = true)
                                              @RequestParam("file") MultipartFile[] multipartFile) throws IOException {
        photoService.uploadPhotos(productType, detailsId, id, multipartFile);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/{productType}/{detailsId}/{id}", produces = "application/json")
    @Operation(summary = "Get photos names")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<List<String>> getPhotosNames(@Parameter(description = "Product type", required = true, example = "CLOTHES")
                                                           @PathVariable ProductType productType,
                                                       @Parameter(description = "Product details id", required = true, example = "123")
                                                           @PathVariable Long detailsId,
                                                       @Parameter(description = "Product id", required = true, example = "11")
                                                           @PathVariable Long id) throws Exception {
        return ResponseEntity.ok(photoService.getPhotosNames(productType, detailsId, id));
    }

    @GetMapping(value = "/{productType}/{detailsId}/{id}/{name}", produces = {"image/jpeg", "image/png"})
    @Operation(summary = "Get photo by params")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<?> getPhoto(@Parameter(description = "Product type", required = true, example = "CLOTHES")
                                                 @PathVariable ProductType productType,
                                             @Parameter(description = "Product details id", required = true, example = "123")
                                                 @PathVariable Long detailsId,
                                             @Parameter(description = "Product id", required = true, example = "11")
                                                 @PathVariable Long id,
                                             @Parameter(description = "Photo name", required = true, example = "3e604362-82ea-4325-831a-f3f16f2fba51")
                                                 @PathVariable String name) throws IOException {
        return ResponseEntity.ok(photoService.getPhoto(productType, detailsId, id, name));
    }

    @DeleteMapping(value = "/{productType}/{detailsId}/{id}/{name}", produces = "application/json")
    @Operation(summary = "Delete photo by params")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<?> deletePhoto(@Parameter(description = "Product type", required = true, example = "CLOTHES")
                                             @PathVariable ProductType productType,
                                         @Parameter(description = "Product details id", required = true, example = "123")
                                             @PathVariable Long detailsId,
                                         @Parameter(description = "Product id", required = true, example = "11")
                                             @PathVariable Long id,
                                         @Parameter(description = "Photo name", required = true, example = "3e604362-82ea-4325-831a-f3f16f2fba51")
                                             @PathVariable String name) throws FileNotFoundException {
        photoService.deletePhoto(productType, detailsId, id, name);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/{productType}/{detailsId}/{id}", produces = "application/json")
    @Operation(summary = "Delete all photos by id")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<?> deleteAllById(@Parameter(description = "Product type", required = true, example = "CLOTHES")
                                               @PathVariable ProductType productType,
                                           @Parameter(description = "Product details id", required = true, example = "123")
                                               @PathVariable Long detailsId,
                                           @Parameter(description = "Product id", required = true, example = "11")
                                               @PathVariable Long id) throws IOException {
        photoService.deleteAllById(productType, detailsId, id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/{productType}/{detailsId}", produces = "application/json")
    @Operation(summary = "Delete all photos by detailsId")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "BAD REQUEST"),
            @ApiResponse(code = 401, message = "UNAUTHORIZED")
    })
    public ResponseEntity<?> deleteAllByDetailsId(@Parameter(description = "Product type", required = true, example = "CLOTHES")
                                                      @PathVariable ProductType productType,
                                                  @Parameter(description = "Product details id", required = true, example = "123")
                                                      @PathVariable Long detailsId) throws IOException {
        photoService.deleteAllByDetailsId(productType, detailsId);
        return ResponseEntity.ok().build();
    }
}
