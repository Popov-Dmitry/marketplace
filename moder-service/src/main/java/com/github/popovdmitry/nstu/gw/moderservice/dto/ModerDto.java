package com.github.popovdmitry.nstu.gw.moderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModerDto {

    private String firstName;
    private String secondName;
    private String email;
    private String password;
}
