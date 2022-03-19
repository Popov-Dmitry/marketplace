package com.github.popovdmitry.gw.verificationservice.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sellers_info")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerInfo {

    @Id
    @ApiModelProperty(example = "341")
    private Long id;

    @Column(name = "first_name")
    @ApiModelProperty(example = "Ivan")
    private String firstName;

    @Column(name = "second_name")
    @ApiModelProperty(example = "Ivanov")
    private String secondName;

    @Column(name = "email")
    @ApiModelProperty(example = "ivan@company.com")
    private String email;

    @Column(name = "shop_name")
    @ApiModelProperty(example = "All Stars")
    private String shopName;

    @Column(name = "country")
    @ApiModelProperty(example = "Russia")
    private String country;

    @Column(name = "organization_type")
    @ApiModelProperty(example = "IP", allowableValues = "IP, OOO, OAO, OTHER")
    private OrganizationType organizationType;

    @Column(name = "inn")
    @ApiModelProperty(example = "1234567890")
    private String inn;

    @Column(name = "legal_address")
    @ApiModelProperty(example = "Россия, г. Москва, ул. Московская, д. 17")
    private String legalAddress;
}
