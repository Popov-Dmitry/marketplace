package com.github.popovdmitry.nstu.gw.wishlistservice.model;

import io.swagger.annotations.ApiModelProperty;
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
    @ApiModelProperty(example = "341")
    private Long id;

    @Column(name = "product_type")
    @ApiModelProperty(example = "CLOTHES")
    private ProductType productType;

    @Column(name = "product_details_id")
    @ApiModelProperty(example = "123")
    private Long productDetailsId;

    @Column(name = "product_id")
    @ApiModelProperty(example = "12345")
    private Long productId;

    @Column(name = "customer_id")
    @ApiModelProperty(example = "111")
    private Long customerId;

    @Column(name = "seller_id")
    @ApiModelProperty(example = "321")
    private Long sellerId;
}
