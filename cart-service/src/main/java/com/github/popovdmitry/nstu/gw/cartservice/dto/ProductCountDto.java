package com.github.popovdmitry.nstu.gw.cartservice.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductCountDto {

    @ApiModelProperty(example = "2")
    private Integer count;
}
