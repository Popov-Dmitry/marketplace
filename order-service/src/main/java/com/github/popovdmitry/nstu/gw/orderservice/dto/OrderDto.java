package com.github.popovdmitry.nstu.gw.orderservice.dto;

import com.github.popovdmitry.nstu.gw.orderservice.model.ProductType;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDto {

    @ApiModelProperty(example = "123", position = 0)
    private Long productDetailsId;

    @ApiModelProperty(example = "12345", position = 1)
    private Long productId;

    @ApiModelProperty(example = "2", position = 2)
    private Long count;

    @ApiModelProperty(example = "55", position = 3)
    private Long customerId;

    @ApiModelProperty(example = "Россия, г. Новосибирск, ул. Ленина 12, кв. 34", position = 4)
    private String address;

    @ApiModelProperty(example = "7", position = 5)
    private Long sellerId;

    @ApiModelProperty(example = "CLOTHES", position = 6)
    private ProductType productType;
}
