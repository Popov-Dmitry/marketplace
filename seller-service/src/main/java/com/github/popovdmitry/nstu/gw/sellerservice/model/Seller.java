package com.github.popovdmitry.nstu.gw.sellerservice.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "sellers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(example = "341", position = 0)
    private Long id;

    @Column(name = "first_name")
    @ApiModelProperty(example = "Ivan", position = 1)
    private String firstName;

    @Column(name = "second_name")
    @ApiModelProperty(example = "Ivanov", position = 2)
    private String secondName;

    @Column(name = "email")
    @ApiModelProperty(example = "ivan@company.com", position = 3)
    private String email;

    @Column(name = "password")
    @ApiModelProperty(notes = "In requests decoded, in responses encoded", position = 4)
    private String password;

    @Column(name = "shop_name")
    @ApiModelProperty(example = "All Stars", position = 5)
    private String shopName;

    @Column(name = "country")
    @ApiModelProperty(example = "Russia", position = 6)
    private String country;

    @Column(name = "organization_type")
    @ApiModelProperty(example = "IP", allowableValues = "IP, OOO, OAO, OTHER", position = 7)
    private OrganizationType organizationType;

    @Column(name = "inn")
    @ApiModelProperty(example = "1234567890", position = 8)
    private String inn;

    @Column(name = "legal_address")
    @ApiModelProperty(example = "Россия, г. Москва, ул. Московская, д. 17", position = 9)
    private String legalAddress;

    @Column(name = "registration_date")
    @ApiModelProperty(example = "10.10.2021", position = 10)
    private Date registrationDate;

    @Column(name = "verification_status")
    @ApiModelProperty(example = "COMPLETED", allowableValues = "IN_PROGRESS, COMPLETED, FAILED", position = 11)
    private VerificationStatus verificationStatus;
}
