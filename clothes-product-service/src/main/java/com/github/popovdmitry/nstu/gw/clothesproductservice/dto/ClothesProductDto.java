package com.github.popovdmitry.nstu.gw.clothesproductservice.dto;

import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Category;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Season;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ClothesProductDto {

    private String color;
    private Size size;
    private Long count;
    private Long regularPrice;
    private Long price;
    private Long weight;
    private Long deliveryId;

    private Long clothesDetailsId;

    private String brand;
    private String title;
    private String description;
    private String composition;
    private Category category;
    private Season season;
    private String type;
    private String productionCountry;
    private String care;
    private String style;
    private Long sellerId;
}
