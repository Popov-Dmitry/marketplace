package com.github.popovdmitry.nstu.gw.authservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "customer-service")
public interface CustomerFeignClient {

    @GetMapping
    boolean isUserExists(@RequestParam("email") String email);
}
