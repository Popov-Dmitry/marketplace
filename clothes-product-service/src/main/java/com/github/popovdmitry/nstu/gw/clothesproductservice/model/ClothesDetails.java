package com.github.popovdmitry.nstu.gw.clothesproductservice.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clothes_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClothesDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "brand")
    @ApiModelProperty(example = "Levi's")
    private String brand;

    @Column(name = "title")
    @ApiModelProperty(example = "Куртка Levi's")
    private String title;

    @Column(name = "description")
    @ApiModelProperty(example = "Джинсовая куртка")
    private String description;

    @Column(name = "composition")
    @ApiModelProperty(example = "100% хлопок")
    private String composition;

    @Column(name = "category")
    @ApiModelProperty(example = "MEN", notes = "MEN, WOMEN, UNISEX, BOYS, GIRLS, UNISEX_KIDS")
    private Category category;

    @Column(name = "season")
    @ApiModelProperty(example = "SPRING", notes = "WINTER, SPRING, SUMMER, AUTUMN")
    private Season season;

    @Column(name = "type")
    @ApiModelProperty(example = "Куртка")
    private String type;

    @Column(name = "production_country")
    @ApiModelProperty(example = "Россия")
    private String productionCountry;

    @Column(name = "care")
    @ApiModelProperty(example = "Бережная стирка при 30 градусах")
    private String care;

    @Column(name = "style")
    @ApiModelProperty(example = "Спортивный")
    private String style;

    @Column(name = "seller_id")
    @ApiModelProperty(example = "1542")
    private Long sellerId;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "clothesDetails",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Clothes> clothes = new ArrayList<>();
}
