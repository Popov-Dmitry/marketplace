package com.github.popovdmitry.gw.verificationservice.dto;

import com.github.popovdmitry.gw.verificationservice.model.OrganizationType;
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
    private String shopName;
    private String country;
    private OrganizationType organizationType;
    private String inn;
    private String legalAddress;
}
