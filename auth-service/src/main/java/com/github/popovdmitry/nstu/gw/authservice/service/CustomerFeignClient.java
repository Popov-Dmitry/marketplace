package com.github.popovdmitry.nstu.gw.authservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "customer-service")
public interface CustomerFeignClient {

    @GetMapping("/${email}")
    boolean isUserExists(String email);
}
