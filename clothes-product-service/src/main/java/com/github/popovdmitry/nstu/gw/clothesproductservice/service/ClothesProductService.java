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

    public ClothesDetails findByClothesDetailsIdAndClothesId(Long clothesDetailsId, Long clothesId)
            throws NotFoundException {
        ClothesDetails clothesDetails = clothesDetailsRepository.findById(clothesDetailsId).orElseThrow(() ->
                new NotFoundException(String.format("ClothesDetails with id %d is not found", clothesDetailsId)));
        clothesDetails.setClothes(clothesDetails.getClothes().stream()
                .filter(clothes -> Objects.equals(clothes.getId(), clothesId))
                .toList());
        return clothesDetails;
    }

    public List<ClothesDetails> findAllBySellerId(Long sellerId) {
        return clothesDetailsRepository.findAllBySellerId(sellerId);
    }

    public SaveClothesReplyDto saveClothes(ClothesProductDto clothesProductDto) throws NotFoundException {
        SaveClothesReplyDto saveClothesReplyDto = new SaveClothesReplyDto();
        Clothes clothes = new Clothes();
        clothes.setColor(clothesProductDto.getColor());
        clothes.setSize(clothesProductDto.getSize());
        clothes.setCount(clothesProductDto.getCount());
        clothes.setRegularPrice(clothesProductDto.getRegularPrice());
        clothes.setPrice(clothesProductDto.getPrice());
        clothes.setWeight(clothesProductDto.getWeight());
        if (Objects.nonNull(clothesProductDto.getClothesDetailsId())) {
            clothes.setClothesDetails(findByClothesDetailsId(clothesProductDto.getClothesDetailsId()));
            saveClothesReplyDto.setClothesDetailsId(clothesProductDto.getClothesDetailsId());
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
            if (clothesProductDto.getProductionCountry().equals("")) {
                clothesDetails.setProductionCountry(null);
            }
            else {
                clothesDetails.setProductionCountry(clothesProductDto.getProductionCountry());
            }
            if (clothesProductDto.getCare().equals("")) {
                clothesDetails.setCare(null);
            }
            else {
                clothesDetails.setCare(clothesProductDto.getCare());
            }
            if (clothesProductDto.getStyle().equals("")) {
                clothesDetails.setStyle(null);
            }
            else {
                clothesDetails.setStyle(clothesProductDto.getStyle());
            }
            clothesDetails.setSellerId(clothesProductDto.getSellerId());
            clothes.setClothesDetails(clothesDetailsRepository.save(clothesDetails));
            saveClothesReplyDto.setClothesDetailsId(clothes.getClothesDetails().getId());
        }
        saveClothesReplyDto.setClothesId(clothesRepository.save(clothes).getId());
        return saveClothesReplyDto;
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
        if (Objects.nonNull(clothesDTO.getRegularPrice()) && clothesDTO.getRegularPrice() > 0) {
            clothes.setRegularPrice(clothesDTO.getRegularPrice());
        }
        if (Objects.isNull(clothesDTO.getPrice()) || clothesDTO.getPrice() > 0) {
            clothes.setPrice(clothesDTO.getPrice());
        }
        if (Objects.nonNull(clothesDTO.getWeight()) && clothesDTO.getWeight() > 0) {
            clothes.setWeight(clothesDTO.getWeight());
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
        if (clothesDetailsDto.getProductionCountry().equals("")) {
            clothesDetails.setProductionCountry(null);
        }
        else {
            clothesDetails.setProductionCountry(clothesDetailsDto.getProductionCountry());
        }
        if (clothesDetailsDto.getCare().equals("")) {
            clothesDetails.setCare(null);
        }
        else {
            clothesDetails.setCare(clothesDetailsDto.getCare());
        }
        if (clothesDetailsDto.getStyle().equals("")) {
            clothesDetails.setStyle(null);
        }
        else {
            clothesDetails.setStyle(clothesDetailsDto.getStyle());
        }

        return clothesDetailsRepository.save(clothesDetails);
    }

    public Clothes updateClothesCount(KafkaOrderDto kafkaOrderDto) throws NotFoundException {
        Clothes clothes = clothesRepository.findById(kafkaOrderDto.getProductId()).orElseThrow(() ->
                new NotFoundException(String.format("Clothes with id %d is not found", kafkaOrderDto.getProductId())));
        clothes.setCount(clothes.getCount() - kafkaOrderDto.getCount());
        return clothesRepository.save(clothes);
    }

    public void deleteClothes(Long clothesDetailsId, Long clothesId) throws NotFoundException {
        Clothes clothes = clothesRepository.findById(clothesId).orElseThrow(() ->
                new NotFoundException(String.format("Clothes with id %d is not found", clothesId)));
        System.out.println(clothes.toString());
        ClothesDetails clothesDetails = clothesDetailsRepository.findById(clothesDetailsId).orElseThrow(() ->
                new NotFoundException(String.format("ClothesDetails with id %d is not found", clothesDetailsId)));
        clothesDetails.getClothes().removeIf(c -> c.getId() == clothesId);
        clothesDetailsRepository.save(clothesDetails);
        clothesRepository.deleteById(clothesId);
    }

    public void deleteClothesDetails(Long clothesDetailsId) throws NotFoundException {
        ClothesDetails clothesDetails = clothesDetailsRepository.findById(clothesDetailsId).orElseThrow(() ->
                new NotFoundException(String.format("ClothesDetails with id %d is not found", clothesDetailsId)));
        clothesDetailsRepository.delete(clothesDetails);
    }

    public List<ClothesDetails> findBySearchClothesProductDto(SearchClothesProductDto searchClothesProductDto) {
        if (Objects.isNull(searchClothesProductDto.getTitle())) {
            searchClothesProductDto.setTitle("");
        }

        log.info(searchClothesProductDto.toString());

        Optional<List<ClothesDetails>> optionalClothesDetailsList = clothesDetailsRepository.findAllByQuery(
                searchClothesProductDto.getBrands(),
                searchClothesProductDto.getTitle(),
                searchClothesProductDto.getCategories(),
                searchClothesProductDto.getSeasons(),
                searchClothesProductDto.getTypes());
        List<ClothesDetails> clothesDetailsList = optionalClothesDetailsList.get();

        if (Objects.nonNull(searchClothesProductDto.getColors()) &&
                Objects.nonNull(searchClothesProductDto.getSizes()) &&
                Objects.nonNull(searchClothesProductDto.getPrice())) {
            for (ClothesDetails clothesDetails : clothesDetailsList) {
                clothesDetails.setClothes(
                        clothesDetails.getClothes().stream()
                                .filter(c -> searchClothesProductDto.getColors().contains(c.getColor()) &&
                                        searchClothesProductDto.getSizes().contains(c.getSize()) &&
                                        (Objects.isNull(c.getPrice()) ?
                                                searchClothesProductDto.getPrice() >= c.getRegularPrice()
                                                : searchClothesProductDto.getPrice() >= c.getPrice()))
                                .toList());
            }
        }
        if (Objects.nonNull(searchClothesProductDto.getColors()) &&
                Objects.nonNull(searchClothesProductDto.getSizes()) &&
                Objects.isNull(searchClothesProductDto.getPrice())) {
            for (ClothesDetails clothesDetails : clothesDetailsList) {
                clothesDetails.setClothes(
                        clothesDetails.getClothes().stream()
                                .filter(c -> searchClothesProductDto.getColors().contains(c.getColor()) &&
                                        searchClothesProductDto.getSizes().contains(c.getSize()))
                                .toList());
            }
        }
        if (Objects.nonNull(searchClothesProductDto.getColors()) &&
                Objects.isNull(searchClothesProductDto.getSizes()) &&
                Objects.nonNull(searchClothesProductDto.getPrice())) {
            for (ClothesDetails clothesDetails : clothesDetailsList) {
                clothesDetails.setClothes(
                        clothesDetails.getClothes().stream()
                                .filter(c -> searchClothesProductDto.getColors().contains(c.getColor()) &&
                                        (Objects.isNull(c.getPrice()) ?
                                                searchClothesProductDto.getPrice() >= c.getRegularPrice()
                                                : searchClothesProductDto.getPrice() >= c.getPrice()))
                                .toList());
            }
        }
        if (Objects.isNull(searchClothesProductDto.getColors()) &&
                Objects.nonNull(searchClothesProductDto.getSizes()) &&
                Objects.nonNull(searchClothesProductDto.getPrice())) {
            for (ClothesDetails clothesDetails : clothesDetailsList) {
                clothesDetails.setClothes(
                        clothesDetails.getClothes().stream()
                                .filter(c -> searchClothesProductDto.getSizes().contains(c.getSize()) &&
                                        (Objects.isNull(c.getPrice()) ?
                                                searchClothesProductDto.getPrice() >= c.getRegularPrice()
                                                : searchClothesProductDto.getPrice() >= c.getPrice()))
                                .toList());
            }
        }
        if (Objects.nonNull(searchClothesProductDto.getColors()) &&
                Objects.isNull(searchClothesProductDto.getSizes()) &&
                Objects.isNull(searchClothesProductDto.getPrice())) {
            for (ClothesDetails clothesDetails : clothesDetailsList) {
                clothesDetails.setClothes(
                        clothesDetails.getClothes().stream()
                                .filter(c -> searchClothesProductDto.getColors().contains(c.getColor()))
                                .toList());
            }
        }
        if (Objects.isNull(searchClothesProductDto.getColors()) &&
                Objects.nonNull(searchClothesProductDto.getSizes()) &&
                Objects.isNull(searchClothesProductDto.getPrice())) {
            for (ClothesDetails clothesDetails : clothesDetailsList) {
                clothesDetails.setClothes(
                        clothesDetails.getClothes().stream()
                                .filter(c -> searchClothesProductDto.getSizes().contains(c.getSize()))
                                .toList());
            }
        }
        if (Objects.isNull(searchClothesProductDto.getColors()) &&
                Objects.isNull(searchClothesProductDto.getSizes()) &&
                Objects.nonNull(searchClothesProductDto.getPrice())) {
            for (ClothesDetails clothesDetails : clothesDetailsList) {
                clothesDetails.setClothes(
                        clothesDetails.getClothes().stream()
                                .filter(c -> (Objects.isNull(c.getPrice()) ?
                                        searchClothesProductDto.getPrice() >= c.getRegularPrice()
                                        : searchClothesProductDto.getPrice() >= c.getPrice()))
                                .toList());
            }
        }
        clothesDetailsList = clothesDetailsList.stream().filter(cd -> !cd.getClothes().isEmpty()).toList();
        log.info(clothesDetailsList.toString());
        return clothesDetailsList;
    }

    public BrandsColorsTypesDistinctDto findBrandsColorsTypesDistinct() {
        BrandsColorsTypesDistinctDto brandsColorsTypesDistinctDto = new BrandsColorsTypesDistinctDto();
        brandsColorsTypesDistinctDto.setBrands(clothesDetailsRepository.findDistinctBrands());
        brandsColorsTypesDistinctDto.setColors(clothesRepository.findDistinctColors());
        brandsColorsTypesDistinctDto.setTypes(clothesDetailsRepository.findDistinctTypes());
        return brandsColorsTypesDistinctDto;
    }
}
