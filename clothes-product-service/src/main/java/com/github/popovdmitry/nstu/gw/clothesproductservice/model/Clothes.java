package com.github.popovdmitry.nstu.gw.clothesproductservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "clothes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "clothesDetails")
public class Clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clothes_details_id")
    @JsonBackReference
    private ClothesDetails clothesDetails;

    @Column(name = "color")
    @ApiModelProperty(example = "Red")
    private String color;

    @Column(name = "size")
    @ApiModelProperty(example = "L", notes = "From XXS to XXXXL")
    private Size size;

    @Column(name = "count")
    @ApiModelProperty(example = "54")
    private Long count;

    @Column(name = "regular_price")
    @ApiModelProperty(example = "1999")
    private Long regularPrice;

    @Column(name = "price")
    @ApiModelProperty(example = "999")
    private Long price;

    @Column(name = "weight")
    @ApiModelProperty(example = "356", notes = "in grams")
    private Long weight;
}
