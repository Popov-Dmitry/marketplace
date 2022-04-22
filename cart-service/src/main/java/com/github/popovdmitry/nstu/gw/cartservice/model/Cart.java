package com.github.popovdmitry.nstu.gw.cartservice.model;

import io.swagger.annotations.ApiModelProperty;
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
    @ApiModelProperty(example = "341", position = 0)
    private Long id;

    @Column(name = "customer_id")
    @ApiModelProperty(example = "123", position = 1)
    private Long customerId;

    @Column(name = "product_type")
    @ApiModelProperty(example = "CLOTHES", position = 2)
    private ProductType productType;

    @Column(name = "product_details_id")
    @ApiModelProperty(example = "12345", position = 3)
    private Long productDetailsId;

    @Column(name = "product_id")
    @ApiModelProperty(example = "5421", position = 4)
    private Long productId;

    @Column(name = "count")
    @ApiModelProperty(example = "2", position = 5)
    private Integer count;
}
