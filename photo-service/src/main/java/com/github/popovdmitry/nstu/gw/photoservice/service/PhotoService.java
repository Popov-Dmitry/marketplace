package com.github.popovdmitry.nstu.gw.photoservice.service;

import com.github.popovdmitry.nstu.gw.photoservice.model.ProductType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PhotoService {

    @Value("${upload.path}")
    private String uploadPath;

    public void uploadPhotos(ProductType productType,
                             Long detailsId,
                             Long id,
                             MultipartFile[] multipartFiles) throws IOException {
        if (Objects.isNull(productType) || Objects.isNull(id) || Objects.isNull(detailsId) || id < 0 || detailsId < 0) {
            throw new IllegalArgumentException("Incorrect argument");
        }

        for (MultipartFile multipartFile : multipartFiles) {
            if (Objects.isNull(multipartFile) || multipartFile.isEmpty()) {
                throw new FileUploadException("File is empty");
            }
            String[] strings = multipartFile.getContentType().split("/");
            if (!strings[0].equals("image") &&
                    (!strings[1].equalsIgnoreCase("jpeg") ||
                            !strings[1].equalsIgnoreCase("jpg") ||
                            !strings[1].equalsIgnoreCase("png"))) {
                throw new FileUploadException("Incorrect file format");
            }

            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            uploadDir = new File(uploadPath + productType.name() + "/");
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            uploadDir = new File(uploadPath + productType.name() + "/" + detailsId + "/");
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            uploadDir = new File(uploadPath + productType.name() + "/" + detailsId + "/" + id + "/");
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }

            String fileName = uploadDir.getAbsolutePath() + "/" + UUID.randomUUID() + "." +
                    multipartFile.getContentType().split("/")[1];
            multipartFile.transferTo(new File(fileName));
        }

    }

    public Resource getPhoto(ProductType productType, Long detailsId, Long id, String name) throws IOException {
        Path filePath = Paths.get(
                uploadPath + productType.name() + "/" + detailsId + "/" + id + "/" + name)
                .normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if(resource.exists()) {
            return resource;
        }
        throw new FileNotFoundException("File not found");
    }

    public List<String> getPhotosNames(ProductType productType, Long detailsId, Long id) {
        return FileUtils.listFiles(
                new File(uploadPath + productType.name() + "/" + detailsId + "/" + id + "/"),
                new String[]{"jpeg", "jpg", "png"},
                false)
                .stream()
                .map(File::getName)
                .toList();
    }

    public void deletePhoto(ProductType productType, Long detailsId, Long id, String name) throws FileNotFoundException {
        File file = new File(uploadPath + productType.name() + "/" + detailsId + "/" + id + "/" + name);
        if (file.exists()) {
            if (file.delete()) {
                return;
            }
        }
        throw new FileNotFoundException("File not found");
    }

    public void deleteAllById(ProductType productType, Long detailsId, Long id) throws IOException {
        File file = new File(uploadPath + productType.name() + "/" + detailsId + "/" + id);
        if (file.exists()) {
            FileUtils.deleteDirectory(file);
            return;
        }
        throw new FileNotFoundException("File not found");
    }

    public void deleteAllByDetailsId(ProductType productType, Long detailsId) throws IOException {
        File file = new File(uploadPath + productType.name() + "/" + detailsId);
        if (file.exists()) {
            FileUtils.deleteDirectory(file);
            return;
        }
        throw new FileNotFoundException("File not found");
    }
}
