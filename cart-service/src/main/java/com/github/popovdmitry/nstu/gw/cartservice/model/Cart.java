package com.github.popovdmitry.nstu.gw.cartservice.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "carts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "product_type")
    private ProductType productType;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "count")
    private Integer count;
}
