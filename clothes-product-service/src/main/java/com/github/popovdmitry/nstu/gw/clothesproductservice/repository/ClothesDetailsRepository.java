package com.github.popovdmitry.nstu.gw.clothesproductservice.repository;

import com.github.popovdmitry.nstu.gw.clothesproductservice.model.ClothesDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClothesDetailsRepository extends JpaRepository<ClothesDetails, Long> {
    Optional<ClothesDetails> findByBrand(String brand);
    Optional<ClothesDetails> findByTitle(String title);
    Optional<ClothesDetails> findByComposition(String composition);
    Optional<ClothesDetails> findByBrandAndTitle(String brand, String title);
    Optional<ClothesDetails> findByBrandAndComposition(String brand, String composition);
    Optional<ClothesDetails> findByTitleAndComposition(String title, String composition);
    Optional<ClothesDetails> findByBrandAndTitleAndComposition(String brand, String title, String composition);

    Optional<List<ClothesDetails>> findAllByBrand(String brand);
    Optional<List<ClothesDetails>> findAllByTitle(String title);
    Optional<List<ClothesDetails>> findAllByComposition(String composition);
    Optional<List<ClothesDetails>> findAllByBrandAndTitle(String brand, String title);
    Optional<List<ClothesDetails>> findAllByBrandAndComposition(String brand, String composition);
    Optional<List<ClothesDetails>> findAllByTitleAndComposition(String title, String composition);
    Optional<List<ClothesDetails>> findAllByBrandAndTitleAndComposition(String brand, String title, String composition);
}
