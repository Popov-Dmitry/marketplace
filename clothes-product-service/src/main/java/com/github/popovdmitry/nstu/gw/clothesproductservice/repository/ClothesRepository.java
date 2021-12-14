package com.github.popovdmitry.nstu.gw.clothesproductservice.repository;

import com.github.popovdmitry.nstu.gw.clothesproductservice.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Long> {
    @Query("select c from Clothes c where " +
            "(:clothesDetails is null or c.clothesDetails = :clothesDetails) " +
            "and (:color is null or upper(c.color) like concat('%', upper(:color), '%')) " +
            "and (:size is null or c.size = :size) " +
            "and (:price is null or c.price <= :price) ")
    Optional<List<Clothes>> findAllByQuery(@Param("clothesDetails") ClothesDetails clothesDetails,
                                                  @Param("color") String color,
                                                  @Param("size") Size size,
                                                  @Param("price") Long price);



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
