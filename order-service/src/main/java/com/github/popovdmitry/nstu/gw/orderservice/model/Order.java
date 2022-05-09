package com.github.popovdmitry.nstu.gw.orderservice.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_details_id")
    private Long productDetailsId;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "count")
    private Long count;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "address")
    private String address;

    @Column(name = "seller_id")
    private Long sellerId;

    @Column(name = "status")
    private Status status;
}
