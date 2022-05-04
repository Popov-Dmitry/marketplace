package com.github.popovdmitry.nstu.gw.clothesproductservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SaveClothesReplyDto {

    private Long clothesDetailsId;
    private Long clothesId;
}
