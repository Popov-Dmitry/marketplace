package com.github.popovdmitry.nstu.gw.clothesproductservice.repository;

import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Clothes;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.ClothesDetails;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Long> {
    Optional<Clothes> findByClothesDetails(ClothesDetails clothesDetails);
    Optional<Clothes> findByColor(String color);
    Optional<Clothes> findBySize(Size size);
    Optional<Clothes> findByClothesDetailsAndColor(ClothesDetails clothesDetails, String color);
    Optional<Clothes> findByClothesDetailsAndSize(ClothesDetails clothesDetails, Size size);
    Optional<Clothes> findByColorAndSize(String color, Size size);
    Optional<Clothes> findByClothesDetailsAndColorAndSize(ClothesDetails clothesDetails, String color, Size size);

    Optional<List<Clothes>> findAllByClothesDetails(ClothesDetails clothesDetails);
    Optional<List<Clothes>> findAllByColor(String color);
    Optional<List<Clothes>> findAllBySize(Size size);
    Optional<List<Clothes>> findAllByClothesDetailsAndColor(ClothesDetails clothesDetails, String color);
    Optional<List<Clothes>> findAllByClothesDetailsAndSize(ClothesDetails clothesDetails, Size size);
    Optional<List<Clothes>> findAllByColorAndSize(String color, Size size);
    Optional<List<Clothes>> findAllByClothesDetailsAndColorAndSize(ClothesDetails clothesDetails, String color, Size size);
}
