package com.github.popovdmitry.gw.verificationservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "verification_status_message")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VerificationStatusMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seller_id")
    private Long sellerId;

    @Column(name = "message")
    private String message;
}
