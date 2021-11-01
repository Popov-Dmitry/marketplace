package com.github.popovdmitry.gw.verificationservice.dto;

import com.github.popovdmitry.gw.verificationservice.model.VerificationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerificationVerdictDto {

    private VerificationStatus verificationStatus;
    private String message;
}
