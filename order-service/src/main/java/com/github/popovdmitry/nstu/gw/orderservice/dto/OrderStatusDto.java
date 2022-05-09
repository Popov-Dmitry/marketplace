package com.github.popovdmitry.nstu.gw.orderservice.dto;

import com.github.popovdmitry.nstu.gw.orderservice.model.Status;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderStatusDto {

    private Status status;
}
