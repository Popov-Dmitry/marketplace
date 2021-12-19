package com.github.popovdmitry.nstu.gw.photoservice.service;

import com.github.popovdmitry.nstu.gw.photoservice.model.ProductType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PhotoService {

    //@Value("${upload.path}")
    private String uploadPath = "E://product-photos/";

    public void uploadPhotos(ProductType productType,
                             Long detailsId,
                             Long id,
                             MultipartFile multipartFile) throws IOException {
        if (Objects.isNull(productType) || Objects.isNull(id) || Objects.isNull(detailsId) || id < 0 || detailsId < 0) {
            throw new IllegalArgumentException("Incorrect argument");
        }
        if (Objects.isNull(multipartFile) || multipartFile.isEmpty()) {
            throw new FileUploadException("File is empty");
        }
        if (!multipartFile.getContentType().split("/")[0].equals("image")) {
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
