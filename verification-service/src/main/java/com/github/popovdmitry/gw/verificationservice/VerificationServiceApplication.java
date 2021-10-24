package com.github.popovdmitry.gw.verificationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class VerificationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(VerificationServiceApplication.class, args);
    }

}
