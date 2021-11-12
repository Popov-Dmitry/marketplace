package com.github.popovdmitry.nstu.gw.clothesproductservice.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private String brand;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "composition")
    private String composition;

    @Column(name = "category")
    private Category category;

    @Column(name = "season")
    private Season season;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "clothesDetails",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Clothes> clothes = new ArrayList<>();
}
