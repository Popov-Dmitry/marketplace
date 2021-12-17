package com.github.popovdmitry.nstu.gw.clothesproductservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ClothesProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClothesProductServiceApplication.class, args);
    }

}
