package com.github.popovdmitry.nstu.gw.moderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ModerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ModerServiceApplication.class, args);
    }

}
