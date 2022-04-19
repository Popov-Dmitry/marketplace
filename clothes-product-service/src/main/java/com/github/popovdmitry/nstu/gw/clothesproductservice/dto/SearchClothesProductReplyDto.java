package com.github.popovdmitry.nstu.gw.clothesproductservice.dto;

import com.github.popovdmitry.nstu.gw.clothesproductservice.model.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchClothesProductReplyDto {

    private Long clothesId;
    private Long clothesDetailsId;

    private Long price;
    private Size size;

    private String brand;
    private String title;

}
