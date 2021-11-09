package com.github.popovdmitry.nstu.gw.adminservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDto {

    private String firstName;
    private String secondName;
    private String email;
    private String password;
}
