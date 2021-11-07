package com.github.popovdmitry.nstu.gw.moderservice.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "moders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Moder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "second_name")
    private String secondName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;
}
