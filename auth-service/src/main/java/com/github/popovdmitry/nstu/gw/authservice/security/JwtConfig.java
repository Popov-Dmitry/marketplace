package com.github.popovdmitry.nstu.gw.authservice.security;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class JwtConfig {

    @Value("${security.jwt.header}")
    private String header;

    @Value("${security.jwt.prefix}")
    private String prefix;

    @Value("${security.jwt.secret}")
    private String secret;

    @Value("${security.jwt.uri}")
    private String authUri;

    @Value("${security.jwt.expirationMilliseconds}")
    private Long expirationMilliseconds;
}
