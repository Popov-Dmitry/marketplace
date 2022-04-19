package com.github.popovdmitry.nstu.gw.clothesproductservice.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BrandsColorsTypesDistinctDto {

    private List<String> brands;
    private List<String> types;
    private List<String> colors;
}
