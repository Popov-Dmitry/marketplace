package com.github.popovdmitry.nstu.gw.sellerservice.service;

import com.github.popovdmitry.nstu.gw.sellerservice.dto.NewSellerDto;
import com.github.popovdmitry.nstu.gw.sellerservice.dto.SellerDto;
import com.github.popovdmitry.nstu.gw.sellerservice.dto.VerificationSellerDTO;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueInnException;
import com.github.popovdmitry.nstu.gw.sellerservice.exceprion.NotUniqueShopNameException;
import com.github.popovdmitry.nstu.gw.sellerservice.model.Seller;
import com.github.popovdmitry.nstu.gw.sellerservice.model.VerificationStatus;
import com.github.popovdmitry.nstu.gw.sellerservice.repository.SellerRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class SellerService {

    @Value("${kafka.topic.producer.seller-topic}")
    private String sellerInfoTopic;

    private final SellerRepository sellerRepository;
    private final KafkaTemplate<String, VerificationSellerDTO> kafkaTemplate;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

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

    public Seller saveSeller(NewSellerDto newSellerDto) throws NotUniqueEmailException, NotUniqueShopNameException, NotUniqueInnException {
        if (sellerRepository.findSellerByEmail(newSellerDto.getEmail()).isEmpty()) {
            if (sellerRepository.findSellerByShopName(newSellerDto.getShopName()).isEmpty()) {
                if (sellerRepository.findSellerByInn(newSellerDto.getInn()).isEmpty()) {
                    Seller seller = new Seller();
                    seller.setFirstName(newSellerDto.getFirstName());
                    seller.setSecondName(newSellerDto.getSecondName());
                    seller.setEmail(newSellerDto.getEmail());
                    seller.setPassword(bCryptPasswordEncoder.encode(newSellerDto.getPassword()));
                    seller.setShopName(newSellerDto.getShopName());
                    seller.setCountry(newSellerDto.getCountry());
                    seller.setOrganizationType(newSellerDto.getOrganizationType());
                    seller.setInn(newSellerDto.getInn());
                    seller.setLegalAddress(newSellerDto.getLegalAddress());
                    seller.setLegalAddress(newSellerDto.getLegalAddress());
                    seller.setRegistrationDate(new Date(new java.util.Date().getTime()));
                    seller.setVerificationStatus(VerificationStatus.IN_PROGRESS);
                    try {
                        Seller savedSeller = sellerRepository.save(seller);
                        kafkaTemplate.send(
                                sellerInfoTopic,
                                savedSeller.getId().toString(),
                                VerificationSellerDTO.fromNewSellerDTO(newSellerDto));
                        log.debug("Save and send seller {}", savedSeller.toString());
                        return savedSeller;
                    }
                    catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
                else {
                    throw new NotUniqueInnException(
                            String.format("Seller with inn %s is already exist", newSellerDto.getInn()));
                }
            }
            else {
                throw new NotUniqueShopNameException(
                        String.format("Seller with shop name %s is already exist", newSellerDto.getSecondName()));
            }
        }
        else {
            throw new NotUniqueEmailException(
                    String.format("Seller with email %s is already exist", newSellerDto.getEmail()));
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
            seller.setPassword(bCryptPasswordEncoder.encode(sellerDto.getPassword()));
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

    public void updateModeratedSeller(String sellerId, String status) {
        Seller seller = sellerRepository.findById(Long.parseLong(sellerId)).get();
        seller.setVerificationStatus(VerificationStatus.valueOf(status));
        sellerRepository.save(seller);
    }
}