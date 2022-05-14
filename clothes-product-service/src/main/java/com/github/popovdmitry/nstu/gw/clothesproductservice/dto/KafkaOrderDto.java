package com.github.popovdmitry.nstu.gw.clothesproductservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class KafkaOrderDto {

    private Long productDetailsId;
    private Long productId;
    private Long count;
}
