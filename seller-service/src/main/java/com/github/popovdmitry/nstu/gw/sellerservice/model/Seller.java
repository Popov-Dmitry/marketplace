package com.github.popovdmitry.nstu.gw.sellerservice.model;

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
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "second_name")
    private String secondName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

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

    @Column(name = "registration_date")
    private Date registrationDate;

    @Column(name = "verification_status")
    private VerificationStatus verificationStatus;
}
