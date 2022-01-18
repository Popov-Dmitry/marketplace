package com.github.popovdmitry.nstu.gw.adminservice.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "admins")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Admin {

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
}
