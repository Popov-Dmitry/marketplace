package com.github.popovdmitry.nstu.gw.wishlistservice.dto;

import com.github.popovdmitry.nstu.gw.wishlistservice.model.ProductType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WishDto {

    private ProductType productType;
    private Long productDetailsId;
    private Long productId;
    private Long customerId;
    private Long sellerId;
}
