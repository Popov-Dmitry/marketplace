package com.github.popovdmitry.nstu.gw.moderservice.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModerDto {

    @ApiModelProperty(example = "Ivan")
    private String firstName;

    @ApiModelProperty(example = "Ivanov")
    private String secondName;

    @ApiModelProperty(example = "ivan@company.com")
    private String email;

    @ApiModelProperty(notes = "In requests decoded, in responses encoded")
    private String password;
}
