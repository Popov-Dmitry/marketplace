package com.github.popovdmitry.nstu.gw.clothesproductservice.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "clothes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clothes_details_id")
    @JsonBackReference
    private ClothesDetails clothesDetails;

    @Column(name = "color")
    private String color;

    @Column(name = "size")
    private Size size;

    @Column(name = "count")
    private Long count;
}
