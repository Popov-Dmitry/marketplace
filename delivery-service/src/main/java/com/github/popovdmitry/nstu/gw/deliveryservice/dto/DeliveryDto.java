package com.github.popovdmitry.nstu.gw.deliveryservice.dto;

import com.github.popovdmitry.nstu.gw.deliveryservice.model.DeliveryPriceVariant;
import com.github.popovdmitry.nstu.gw.deliveryservice.model.DeliveryVariant;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryDto {

    @ApiModelProperty(example = "RUSSIAN_POST")
    private DeliveryVariant deliveryVariant;

    @ApiModelProperty(example = "true")
    private Boolean deliveryPriceIncluded;

    @ApiModelProperty(example = "100")
    private Long deliveryPrice;

    @ApiModelProperty(example = "CALCULATE")
    private DeliveryPriceVariant deliveryPriceVariant;

    @ApiModelProperty(example = "101000")
    private String departureIndex;

    @ApiModelProperty(example = "101000")
    private String returnIndex;

    @ApiModelProperty(example = "31")
    private String packVariant;

    @ApiModelProperty(example = "41,42")
    private String service;

    @ApiModelProperty(example = "578")
    private Long sellerId;
}
