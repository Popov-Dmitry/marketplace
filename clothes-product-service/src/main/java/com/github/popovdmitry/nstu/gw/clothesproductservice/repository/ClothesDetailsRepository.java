package com.github.popovdmitry.nstu.gw.clothesproductservice.repository;

import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Category;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.ClothesDetails;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClothesDetailsRepository extends JpaRepository<ClothesDetails, Long> {
    @Query("select cd from ClothesDetails cd where " +
            "(:brand = '' or upper(cd.brand) like concat('%', upper(:brand), '%')) " +
            "and (:title = '' or upper(cd.title) like concat('%', upper(:title), '%')) " +
            "and (:category is null or cd.category = :category) " +
            "and (:season is null or cd.season = :season) " +
            "and (:type = '' or upper(cd.type) like concat('%', upper(:type), '%')) ")
    Optional<List<ClothesDetails>> findAllByQuery(@Param("brand") String brand,
                                                 @Param("title") String title,
                                                 @Param("category") Category category,
                                                 @Param("season") Season season,
                                                 @Param("type") String type);
}
