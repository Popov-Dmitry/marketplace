package com.github.popovdmitry.nstu.gw.photoservice.controller;

import com.github.popovdmitry.nstu.gw.photoservice.model.ProductType;
import com.github.popovdmitry.nstu.gw.photoservice.service.PhotoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
                                          @RequestParam("file") MultipartFile[] multipartFile) {
        try {
            photoService.uploadPhotos(productType, detailsId, id, multipartFile);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{productType}/{detailsId}/{id}")
    public ResponseEntity<?> getPhotosNames(@PathVariable ProductType productType,
                                            @PathVariable Long detailsId,
                                            @PathVariable Long id) {
        try {
            return ResponseEntity.ok(photoService.getPhotosNames(productType, detailsId, id));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found");
        }

    }

    @GetMapping("/{productType}/{detailsId}/{id}/{name}")
    public ResponseEntity<?> getPhoto(@PathVariable ProductType productType,
                                      @PathVariable Long detailsId,
                                      @PathVariable Long id,
                                      @PathVariable String name) {
        try {
            return ResponseEntity.ok(photoService.getPhoto(productType, detailsId, id, name));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{productType}/{detailsId}/{id}/{name}")
    public ResponseEntity<?> deletePhoto(@PathVariable ProductType productType,
                                         @PathVariable Long detailsId,
                                         @PathVariable Long id,
                                         @PathVariable String name) {
        try {
            photoService.deletePhoto(productType, detailsId, id, name);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{productType}/{detailsId}/{id}")
    public ResponseEntity<?> deleteAllById(@PathVariable ProductType productType,
                                           @PathVariable Long detailsId,
                                           @PathVariable Long id) {
        try {
            photoService.deleteAllById(productType, detailsId, id);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{productType}/{detailsId}")
    public ResponseEntity<?> deleteAllByDetailsId(@PathVariable ProductType productType,
                                                  @PathVariable Long detailsId) {
        try {
            photoService.deleteAllByDetailsId(productType, detailsId);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
