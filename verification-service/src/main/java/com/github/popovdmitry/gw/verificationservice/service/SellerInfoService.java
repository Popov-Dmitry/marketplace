package com.github.popovdmitry.gw.verificationservice.service;

import com.github.popovdmitry.gw.verificationservice.model.SellerInfo;
import com.github.popovdmitry.gw.verificationservice.repository.SellerInfoRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SellerInfoService {

    private final SellerInfoRepository sellerInfoRepository;

    public SellerInfo findById(Long id) throws NotFoundException {
        return sellerInfoRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Seller with id %d is not found", id)));
    }

    public List<SellerInfo> getAll() {
        return sellerInfoRepository.findAll();
    }

    public SellerInfo saveSellerInfo(SellerInfo sellerInfo) {
        return sellerInfoRepository.save(sellerInfo);
    }

    public void deleteSellerInfo(Long id) throws NotFoundException {
        SellerInfo sellerInfo = sellerInfoRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Seller with id %d is not found", id)));
        sellerInfoRepository.delete(sellerInfo);
    }
}
