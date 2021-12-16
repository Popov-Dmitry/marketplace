package com.github.popovdmitry.nstu.gw.clothesproductservice.service;

import com.github.popovdmitry.nstu.gw.clothesproductservice.dto.*;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Clothes;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.ClothesDetails;
import com.github.popovdmitry.nstu.gw.clothesproductservice.repository.ClothesDetailsRepository;
import com.github.popovdmitry.nstu.gw.clothesproductservice.repository.ClothesRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClothesProductService {

    private final ClothesRepository clothesRepository;
    private final ClothesDetailsRepository clothesDetailsRepository;

    public Clothes findByClothesId(Long id) throws NotFoundException {
        return clothesRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Clothes with id %d is not found", id)));
    }

    public ClothesDetails findByClothesDetailsId(Long id) throws NotFoundException {
        return clothesDetailsRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("ClothesDetails with id %d is not found", id)));
    }

    public List<Clothes> findAllByClothesDetailsId(Long id) throws NotFoundException {
        return clothesRepository.findAllByClothesDetails(findByClothesDetailsId(id));
    }

    public Clothes saveClothes(ClothesProductDto clothesProductDto) throws NotFoundException {
        Clothes clothes = new Clothes();
        clothes.setColor(clothesProductDto.getColor());
        clothes.setSize(clothesProductDto.getSize());
        clothes.setCount(clothesProductDto.getCount());
        clothes.setPrice(clothesProductDto.getPrice());
        if (Objects.nonNull(clothesProductDto.getClothesDetailsId())) {
            clothes.setClothesDetails(findByClothesDetailsId(clothesProductDto.getClothesDetailsId()));
        }
        else {
            ClothesDetails clothesDetails = new ClothesDetails();
            clothesDetails.setBrand(clothesProductDto.getBrand());
            clothesDetails.setTitle(clothesProductDto.getTitle());
            clothesDetails.setDescription(clothesProductDto.getDescription());
            clothesDetails.setComposition(clothesProductDto.getComposition());
            clothesDetails.setCategory(clothesProductDto.getCategory());
            clothesDetails.setSeason(clothesProductDto.getSeason());
            clothesDetails.setType(clothesProductDto.getType());
            clothes.setClothesDetails(clothesDetailsRepository.save(clothesDetails));
        }
        return clothesRepository.save(clothes);
    }

    public Clothes updateClothes(Long clothesId, ClothesDTO clothesDTO) throws NotFoundException {
        Clothes clothes = clothesRepository.findById(clothesId).orElseThrow(() ->
                new NotFoundException(String.format("Clothes with id %d is not found", clothesId)));

        if (Objects.nonNull(clothesDTO.getColor()) && !clothesDTO.getColor().equals("")) {
            clothes.setColor(clothesDTO.getColor());
        }
        if (Objects.nonNull(clothesDTO.getSize())) {
            clothes.setSize(clothesDTO.getSize());
        }
        if (Objects.nonNull(clothesDTO.getCount()) && clothesDTO.getCount() >= 0) {
            clothes.setCount(clothesDTO.getCount());
        }
        if (Objects.nonNull(clothesDTO.getPrice()) && clothesDTO.getPrice() > 0) {
            clothes.setPrice(clothesDTO.getPrice());
        }

        return clothesRepository.save(clothes);
    }

    public ClothesDetails updateClothesDetails(Long clothesDetailsId, ClothesDetailsDto clothesDetailsDto) throws NotFoundException {
        ClothesDetails clothesDetails = clothesDetailsRepository.findById(clothesDetailsId).orElseThrow(() ->
                new NotFoundException(String.format("ClothesDetails with id %d is not found", clothesDetailsId)));

        if (Objects.nonNull(clothesDetailsDto.getBrand()) && !clothesDetailsDto.getBrand().equals("")) {
            clothesDetails.setBrand(clothesDetailsDto.getBrand());
        }
        if (Objects.nonNull(clothesDetailsDto.getTitle()) && !clothesDetailsDto.getTitle().equals("")) {
            clothesDetails.setTitle(clothesDetailsDto.getTitle());
        }
        if (Objects.nonNull(clothesDetailsDto.getDescription()) && !clothesDetailsDto.getDescription().equals("")) {
            clothesDetails.setDescription(clothesDetailsDto.getDescription());
        }
        if (Objects.nonNull(clothesDetailsDto.getComposition()) && !clothesDetailsDto.getComposition().equals("")) {
            clothesDetails.setComposition(clothesDetailsDto.getComposition());
        }
        if (Objects.nonNull(clothesDetailsDto.getCategory())) {
            clothesDetails.setCategory(clothesDetailsDto.getCategory());
        }
        if (Objects.nonNull(clothesDetailsDto.getSeason())) {
            clothesDetails.setSeason(clothesDetailsDto.getSeason());
        }
        if (Objects.nonNull(clothesDetailsDto.getType()) && !clothesDetailsDto.getType().equals("")) {
            clothesDetails.setType(clothesDetailsDto.getType());
        }

        return clothesDetailsRepository.save(clothesDetails);
    }

    public void deleteClothes(Long clothesId) throws NotFoundException {
        Clothes clothes = clothesRepository.findById(clothesId).orElseThrow(() ->
                new NotFoundException(String.format("Clothes with id %d is not found", clothesId)));
        clothesRepository.delete(clothes);
    }

    public void deleteClothesDetails(Long clothesDetailsId) throws NotFoundException {
        ClothesDetails clothesDetails = clothesDetailsRepository.findById(clothesDetailsId).orElseThrow(() ->
                new NotFoundException(String.format("ClothesDetails with id %d is not found", clothesDetailsId)));
        clothesDetailsRepository.delete(clothesDetails);
    }

    public List<SearchClothesProductReplyDto> findBySearchClothesProductDto(SearchClothesProductDto searchClothesProductDto) {
        if (Objects.isNull(searchClothesProductDto.getBrand())) {
            searchClothesProductDto.setBrand("");
        }
        if (Objects.isNull(searchClothesProductDto.getTitle())) {
            searchClothesProductDto.setTitle("");
        }
        if (Objects.isNull(searchClothesProductDto.getType())) {
            searchClothesProductDto.setType("");
        }
        if (Objects.isNull(searchClothesProductDto.getColor())) {
            searchClothesProductDto.setColor("");
        }
        log.debug(searchClothesProductDto.toString());

        Optional<List<ClothesDetails>> optionalClothesDetailsList = clothesDetailsRepository.findAllByQuery(
                searchClothesProductDto.getBrand(),
                searchClothesProductDto.getTitle(),
                searchClothesProductDto.getCategory(),
                searchClothesProductDto.getSeason(),
                searchClothesProductDto.getType());
        List<ClothesDetails> clothesDetailsList = optionalClothesDetailsList.get();
        log.debug(clothesDetailsList.toString());
        List<SearchClothesProductReplyDto> searchClothesProductReplyDtoList = new ArrayList<>();

        for (ClothesDetails clothesDetails : clothesDetailsList) {
            Optional<List<Clothes>> optionalClothesList = clothesRepository.findAllByQuery(
                    clothesDetails,
                    searchClothesProductDto.getColor(),
                    searchClothesProductDto.getSize(),
                    searchClothesProductDto.getPrice()
            );
            if (optionalClothesList.isPresent()) {
                List<Clothes> clothesList = optionalClothesList.get();
                for (Clothes clothes : clothesList) {
                    searchClothesProductReplyDtoList.add(new SearchClothesProductReplyDto(
                            clothes.getId(),
                            clothes.getClothesDetails().getId(),
                            clothes.getPrice(),
                            clothes.getClothesDetails().getBrand(),
                            clothes.getClothesDetails().getTitle()
                    ));
                }
            }
        }
        return searchClothesProductReplyDtoList;
    }
}
