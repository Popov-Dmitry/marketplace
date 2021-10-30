package com.github.popovdmitry.gw.verificationservice.model;

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
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "second_name")
    private String secondName;

    @Column(name = "email")
    private String email;

    @Column(name = "shop_name")
    private String shopName;

    @Column(name = "country")
    private String country;

    @Column(name = "organization_type")
    private OrganizationType organizationType;

    @Column(name = "inn")
    private String inn;

    @Column(name = "legal_address")
    private String legalAddress;
}
