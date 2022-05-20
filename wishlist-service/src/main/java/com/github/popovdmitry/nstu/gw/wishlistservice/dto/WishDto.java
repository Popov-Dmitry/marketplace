package com.github.popovdmitry.nstu.gw.wishlistservice.dto;

import com.github.popovdmitry.nstu.gw.wishlistservice.model.ProductType;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WishDto {

    @ApiModelProperty(example = "CLOTHES")
    private ProductType productType;

    @ApiModelProperty(example = "123")
    private Long productDetailsId;

    @ApiModelProperty(example = "12345")
    private Long productId;

    @ApiModelProperty(example = "111")
    private Long customerId;

    @ApiModelProperty(example = "321")
    private Long sellerId;
}
