package com.github.popovdmitry.nstu.gw.sellerservice.service;

import com.github.popovdmitry.nstu.gw.sellerservice.dto.SellerDto;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.sellerservice.model.Seller;
import com.github.popovdmitry.nstu.gw.sellerservice.model.VerificationStatus;
import com.github.popovdmitry.nstu.gw.sellerservice.repository.SellerRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class SellerService {

    private final SellerRepository sellerRepository;

    public Seller findById(Long id) throws NotFoundException {
        return sellerRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Seller with id %d is not found", id)));
    }

    public Seller findByEmail(String email) throws NotFoundException {
        return sellerRepository.findSellerByEmail(email).orElseThrow(() ->
                new NotFoundException(String.format("Seller with email %s is not found", email)));
    }

    public Seller findByShopName(String shopName) throws NotFoundException {
        return sellerRepository.findSellerByShopName(shopName).orElseThrow(() ->
                new NotFoundException(String.format("Seller with shop name %s is not found", shopName)));
    }

    public Seller findByInn(String inn) throws NotFoundException {
        return sellerRepository.findSellerByInn(inn).orElseThrow(() ->
                new NotFoundException(String.format("Seller with inn %s is not found", inn)));
    }

    public List<Seller> findByVerificationStatus(VerificationStatus verificationStatus) {
        return sellerRepository.findAllByVerificationStatus(verificationStatus);
    }

    public void saveSeller(Seller seller) throws NotUniqueEmailException {
        try {
            sellerRepository.save(seller);
        }
        catch (Exception e) {
            throw new NotUniqueEmailException(
                    String.format("Seller with email %s is already exist", seller.getEmail()));
        }
    }

    public Seller updateSeller(Long id, SellerDto sellerDto) throws NotFoundException {
        Seller seller = sellerRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Seller with id %d is not found", id)));

        if (Objects.nonNull(sellerDto.getFirstName()) && !sellerDto.getFirstName().isEmpty()) {
            seller.setFirstName(sellerDto.getFirstName());
        }
        if (Objects.nonNull(sellerDto.getSecondName()) && !sellerDto.getSecondName().isEmpty()) {
            seller.setSecondName(sellerDto.getSecondName());
        }
        if (Objects.nonNull(sellerDto.getEmail()) && !sellerDto.getEmail().isEmpty()) {
            seller.setEmail(sellerDto.getEmail());
        }
        if (Objects.nonNull(sellerDto.getPassword()) && !sellerDto.getPassword().isEmpty()) {
            seller.setPassword(sellerDto.getPassword());
        }
        if (Objects.nonNull(sellerDto.getShopName()) && !sellerDto.getShopName().isEmpty()) {
            seller.setShopName(sellerDto.getShopName());
        }
        if (Objects.nonNull(sellerDto.getCountry()) && !sellerDto.getCountry().isEmpty()) {
            seller.setCountry(sellerDto.getCountry());
        }
        if (Objects.nonNull(sellerDto.getOrganizationType())) {
            seller.setOrganizationType(sellerDto.getOrganizationType());
        }
        if (Objects.nonNull(sellerDto.getLegalAddress()) && !sellerDto.getLegalAddress().isEmpty()) {
            seller.setLegalAddress(sellerDto.getLegalAddress());
        }

        return sellerRepository.save(seller);
    }

    public void deleteSeller(Long id) throws NotFoundException {
        Seller customer = sellerRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Seller with id %d is not found", id)));
        sellerRepository.delete(customer);
    }
}
