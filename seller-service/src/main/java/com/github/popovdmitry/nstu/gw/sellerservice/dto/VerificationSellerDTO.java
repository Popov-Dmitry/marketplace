package com.github.popovdmitry.nstu.gw.sellerservice.dto;

import com.github.popovdmitry.nstu.gw.sellerservice.model.OrganizationType;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerificationSellerDTO {

    @ApiModelProperty(example = "Ivan")
    private String firstName;

    @ApiModelProperty(example = "Ivanov")
    private String secondName;

    @ApiModelProperty(example = "ivan@company.com")
    private String email;

    @ApiModelProperty(example = "All Stars")
    private String shopName;

    @ApiModelProperty(example = "Russia")
    private String country;

    @ApiModelProperty(example = "IP", allowableValues = "IP, OOO, OAO, OTHER")
    private OrganizationType organizationType;

    @ApiModelProperty(example = "1234567890")
    private String inn;

    @ApiModelProperty(example = "Россия, г. Москва, ул. Московская, д. 17")
    private String legalAddress;

    public static VerificationSellerDTO fromNewSellerDTO(NewSellerDto newSellerDto) {
        return new VerificationSellerDTO(
                newSellerDto.getFirstName(),
                newSellerDto.getSecondName(),
                newSellerDto.getEmail(),
                newSellerDto.getShopName(),
                newSellerDto.getCountry(),
                newSellerDto.getOrganizationType(),
                newSellerDto.getInn(),
                newSellerDto.getLegalAddress());
    }
}
