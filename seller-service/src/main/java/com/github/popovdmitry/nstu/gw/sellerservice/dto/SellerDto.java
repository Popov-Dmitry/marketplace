package com.github.popovdmitry.nstu.gw.sellerservice.dto;

import com.github.popovdmitry.nstu.gw.sellerservice.model.OrganizationType;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SellerDto {

    @ApiModelProperty(example = "Ivan")
    private String firstName;

    @ApiModelProperty(example = "Ivanov")
    private String secondName;

    @ApiModelProperty(example = "ivan@company.com")
    private String email;

    @ApiModelProperty(notes = "In requests decoded, in responses encoded")
    private String password;

    @ApiModelProperty(example = "All Stars")
    private String shopName;

    @ApiModelProperty(example = "Russia")
    private String country;

    @ApiModelProperty(example = "IP", allowableValues = "IP, OOO, OAO, OTHER")
    private OrganizationType organizationType;

    @ApiModelProperty(example = "Россия, г. Москва, ул. Московская, д. 17")
    private String legalAddress;
}
