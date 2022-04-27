package com.github.popovdmitry.nstu.gw.customerservice.dto;

import com.github.popovdmitry.nstu.gw.customerservice.model.Sex;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomerDto {

    @ApiModelProperty(example = "Ivan")
    private String firstName;

    @ApiModelProperty(example = "Ivanov")
    private String secondName;

    @ApiModelProperty(example = "ivan@company.com")
    private String email;

    @ApiModelProperty(notes = "In requests decoded, in responses encoded")
    private String password;

    @ApiModelProperty(example = "MALE")
    private Sex sex;

    @ApiModelProperty(example = "12")
    private Integer birthDay;

    @ApiModelProperty(example = "2")
    private Integer birthMonth;

    @ApiModelProperty(example = "1984")
    private Integer birthYear;
}
