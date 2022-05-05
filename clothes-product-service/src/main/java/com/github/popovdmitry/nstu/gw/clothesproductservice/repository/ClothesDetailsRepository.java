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
            "((:brands) is null or cd.brand in (:brands)) " +
            "and (:title = '' or upper(cd.title) like concat('%', upper(:title), '%')) " +
            "and ((:categories) is null or cd.category in (:categories)) " +
            "and ((:seasons) is null or cd.season in (:seasons)) " +
            "and ((:types) is null or cd.type in (:types)) ")
    Optional<List<ClothesDetails>> findAllByQuery(@Param("brands") List<String> brands,
                                                  @Param("title") String title,
                                                  @Param("categories") List<Category> categories,
                                                  @Param("seasons") List<Season> seasons,
                                                  @Param("types") List<String> types);

    @Query("SELECT DISTINCT cd.brand FROM ClothesDetails cd")
    List<String> findDistinctBrands();

    @Query("SELECT DISTINCT cd.type FROM ClothesDetails cd")
    List<String> findDistinctTypes();

    List<ClothesDetails> findAllBySellerId(Long sellerId);
}
