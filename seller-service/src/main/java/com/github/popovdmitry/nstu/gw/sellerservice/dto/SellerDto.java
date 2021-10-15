package com.github.popovdmitry.nstu.gw.sellerservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SellerDto {

    private String firstName;
    private String secondName;
    private String email;
    private String password;
    private String shopName;
}
