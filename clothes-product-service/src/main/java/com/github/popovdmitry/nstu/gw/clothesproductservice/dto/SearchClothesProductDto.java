package com.github.popovdmitry.nstu.gw.clothesproductservice.dto;

import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Category;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Season;
import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SearchClothesProductDto {

    private List<String> colors;
    private List<Size> sizes;
    private Long price;

    private List<String> brands;
    private String title;
    private List<Category> categories;
    private List<Season> seasons;
    private List<String> types;
}
