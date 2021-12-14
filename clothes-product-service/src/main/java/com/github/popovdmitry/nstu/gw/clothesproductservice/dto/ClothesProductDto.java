package com.github.popovdmitry.nstu.gw.clothesproductservice.dto;

import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Category;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Season;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClothesProductDto {

    private String color;
    private Size size;
    private Long price;

    private String brand;
    private String title;
    private Category category;
    private Season season;
    private String type;
}
