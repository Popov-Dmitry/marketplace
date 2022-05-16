package com.github.popovdmitry.nstu.gw.deliveryservice.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(example = "341")
    private Long id;

    @Column(name = "address")
    @ApiModelProperty(example = "Россия, г. Новосибирск, ул. Ленина 12, кв. 34")
    private String address;

    @Column(name = "index")
    @ApiModelProperty(example = "101000")
    private String index;

    @Column(name = "customer_id")
    @ApiModelProperty(example = "1234")
    private Long customerId;

    @Column(name = "is_main")
    @ApiModelProperty(example = "true")
    private Boolean isMain;
}
