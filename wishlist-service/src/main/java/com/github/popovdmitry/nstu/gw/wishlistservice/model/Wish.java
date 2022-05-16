package com.github.popovdmitry.nstu.gw.wishlistservice.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "wishes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Wish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_type")
    private ProductType productType;

    @Column(name = "product_details_id")
    private Long productDetailsId;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "seller_id")
    private Long sellerId;
}
