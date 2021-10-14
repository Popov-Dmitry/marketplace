package com.github.popovdmitry.nstu.gw.authservice.service;

import com.github.popovdmitry.nstu.gw.authservice.dto.EncodedPasswordDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "customer-service")
public interface CustomerFeignClient {

    @GetMapping
    ResponseEntity<EncodedPasswordDto> getEncodedPasswordByEmail(@RequestParam("email") String email);
}
