package com.github.popovdmitry.nstu.gw.orderservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDto {

    private Long productDetailsId;
    private Long productId;
    private Long count;
    private Long customerId;
    private String address;
    private Long sellerId;
}
