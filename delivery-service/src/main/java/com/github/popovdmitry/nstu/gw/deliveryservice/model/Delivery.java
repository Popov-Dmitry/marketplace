package com.github.popovdmitry.nstu.gw.deliveryservice.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "delivery")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "delivery_variant")
    @ApiModelProperty(example = "RUSSIAN_POST")
    private DeliveryVariant deliveryVariant;

    @Column(name = "delivery_price_included")
    @ApiModelProperty(example = "true")
    private Boolean deliveryPriceIncluded;

    @Column(name = "delivery_price")
    @ApiModelProperty(example = "100")
    private Long deliveryPrice;

    @Column(name = "delivery_price_variant")
    @ApiModelProperty(example = "CALCULATE")
    private DeliveryPriceVariant deliveryPriceVariant;

    @Column(name = "departure_index")
    @ApiModelProperty(example = "101000")
    private String departureIndex;

    @Column(name = "return_index")
    @ApiModelProperty(example = "101000")
    private String returnIndex;

    @Column(name = "pack_variant")
    @ApiModelProperty(example = "31")
    private String packVariant;

    @Column(name = "service")
    @ApiModelProperty(example = "41,42")
    private String service;

    @Column(name = "seller_id")
    @ApiModelProperty(example = "578")
    private Long sellerId;
}
