package com.github.popovdmitry.nstu.gw.deliveryservice.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddressDto {

    @ApiModelProperty(example = "Россия, г. Новосибирск, ул. Ленина 12, кв. 34")
    private String address;

    @ApiModelProperty(example = "101000")
    private String index;

    @ApiModelProperty(example = "1234")
    private Long customerId;

    @ApiModelProperty(example = "true")
    private Boolean isMain;
}
