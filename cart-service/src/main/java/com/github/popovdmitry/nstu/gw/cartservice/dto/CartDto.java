package com.github.popovdmitry.nstu.gw.cartservice.dto;

import com.github.popovdmitry.nstu.gw.cartservice.model.ProductType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartDto {

    private Long customerId;
    private ProductType productType;
    private Long productId;
    private Integer count;
}
