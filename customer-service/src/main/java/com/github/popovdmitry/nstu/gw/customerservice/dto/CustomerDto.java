package com.github.popovdmitry.nstu.gw.customerservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {

    private String firstName;
    private String secondName;
    private String email;
    private String password;
}
