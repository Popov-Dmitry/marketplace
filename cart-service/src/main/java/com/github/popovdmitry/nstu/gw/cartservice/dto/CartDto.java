package com.github.popovdmitry.nstu.gw.cartservice.dto;

import com.github.popovdmitry.nstu.gw.cartservice.model.ProductType;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartDto {

    @ApiModelProperty(example = "123", position = 0)
    private Long customerId;

    @ApiModelProperty(example = "CLOTHES", position = 1)
    private ProductType productType;

    @ApiModelProperty(example = "12345", position = 2)
    private Long productDetailsId;

    @ApiModelProperty(example = "5421", position = 3)
    private Long productId;

    @ApiModelProperty(example = "2", position = 4)
    private Integer count;
}
