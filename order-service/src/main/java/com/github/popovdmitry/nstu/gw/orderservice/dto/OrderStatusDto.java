package com.github.popovdmitry.nstu.gw.orderservice.dto;

import com.github.popovdmitry.nstu.gw.orderservice.model.Status;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderStatusDto {

    @ApiModelProperty(example = "ACCEPTED")
    private Status status;
}
