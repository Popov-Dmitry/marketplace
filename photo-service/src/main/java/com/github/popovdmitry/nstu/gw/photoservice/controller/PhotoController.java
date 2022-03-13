package com.github.popovdmitry.nstu.gw.photoservice.controller;

import com.github.popovdmitry.nstu.gw.photoservice.model.ProductType;
import com.github.popovdmitry.nstu.gw.photoservice.service.PhotoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PhotoController {

    private final PhotoService photoService;

    @PostMapping("/")
    public ResponseEntity<?> uploadPhotos(@RequestParam("productType") ProductType productType,
                                          @RequestParam("detailsId") Long detailsId,
                                          @RequestParam("id") Long id,
                                          @RequestParam("file") MultipartFile[] multipartFile) throws IOException {
        photoService.uploadPhotos(productType, detailsId, id, multipartFile);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{productType}/{detailsId}/{id}")
    public ResponseEntity<?> getPhotosNames(@PathVariable ProductType productType,
                                            @PathVariable Long detailsId,
                                            @PathVariable Long id) throws Exception {
        return ResponseEntity.ok(photoService.getPhotosNames(productType, detailsId, id));
    }

    @GetMapping("/{productType}/{detailsId}/{id}/{name}")
    public ResponseEntity<?> getPhoto(@PathVariable ProductType productType,
                                      @PathVariable Long detailsId,
                                      @PathVariable Long id,
                                      @PathVariable String name) throws IOException {
        return ResponseEntity.ok(photoService.getPhoto(productType, detailsId, id, name));
    }

    @DeleteMapping("/{productType}/{detailsId}/{id}/{name}")
    public ResponseEntity<?> deletePhoto(@PathVariable ProductType productType,
                                         @PathVariable Long detailsId,
                                         @PathVariable Long id,
                                         @PathVariable String name) throws FileNotFoundException {
        photoService.deletePhoto(productType, detailsId, id, name);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productType}/{detailsId}/{id}")
    public ResponseEntity<?> deleteAllById(@PathVariable ProductType productType,
                                           @PathVariable Long detailsId,
                                           @PathVariable Long id) throws IOException {
        photoService.deleteAllById(productType, detailsId, id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productType}/{detailsId}")
    public ResponseEntity<?> deleteAllByDetailsId(@PathVariable ProductType productType,
                                                  @PathVariable Long detailsId) throws IOException {
        photoService.deleteAllByDetailsId(productType, detailsId);
        return ResponseEntity.ok().build();
    }
}
