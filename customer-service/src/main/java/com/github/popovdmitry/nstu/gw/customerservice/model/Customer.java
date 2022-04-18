package com.github.popovdmitry.nstu.gw.customerservice.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "customers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(example = "341", position = 0)
    private Long id;

    @Column(name = "first_name")
    @ApiModelProperty(example = "Ivan", position = 1)
    private String firstName;

    @Column(name = "second_name")
    @ApiModelProperty(example = "Ivanov", position = 2)
    private String secondName;

    @Column(name = "email")
    @ApiModelProperty(example = "ivan@company.com", position = 3)
    private String email;

    @Column(name = "password")
    @ApiModelProperty(notes = "In requests decoded, in responses encoded", position = 4)
    private String password;

    @Column(name = "sex")
    @ApiModelProperty(example = "MALE")
    private Sex sex;

    @Column(name = "birth_day")
    @ApiModelProperty(example = "12")
    private Integer birthDay;

    @Column(name = "birth_month")
    @ApiModelProperty(example = "2")
    private Integer birthMonth;

    @Column(name = "birth_year")
    @ApiModelProperty(example = "1984")
    private Integer birthYear;
}
