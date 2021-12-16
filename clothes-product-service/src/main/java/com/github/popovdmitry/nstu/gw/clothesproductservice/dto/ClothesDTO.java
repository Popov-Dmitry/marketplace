package com.github.popovdmitry.nstu.gw.clothesproductservice.dto;

import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ClothesDTO {

    private String color;
    private Size size;
    private Long count;
    private Long price;
}
