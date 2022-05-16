package com.github.popovdmitry.nstu.gw.orderservice.dto;

import com.github.popovdmitry.nstu.gw.orderservice.model.Reason;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReturnDto {

    @ApiModelProperty(example = "QUALITY")
    private Reason reason;

    @ApiModelProperty(example = "Пятно на одежде")
    private String description;

    @ApiModelProperty(example = "1234")
    private Long orderId;
}
