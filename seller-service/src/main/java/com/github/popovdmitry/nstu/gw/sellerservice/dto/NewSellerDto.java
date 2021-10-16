package com.github.popovdmitry.nstu.gw.sellerservice.dto;

import com.github.popovdmitry.nstu.gw.sellerservice.model.OrganizationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewSellerDto {

    private String firstName;
    private String secondName;
    private String email;
    private String password;
    private String shopName;
    private String country;
    private OrganizationType organizationType;
    private String inn;
    private String legalAddress;
}
