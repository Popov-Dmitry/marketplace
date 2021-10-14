package com.github.popovdmitry.nstu.gw.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EncodedPasswordDto {

    private String encodedPassword;
}
