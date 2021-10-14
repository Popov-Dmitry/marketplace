package com.github.popovdmitry.nstu.gw.authservice.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.popovdmitry.nstu.gw.authservice.model.UserCredentials;
import com.github.popovdmitry.nstu.gw.authservice.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;

@Slf4j
public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtConfig jwtConfig;
    private final UserService userService = UserService.getInstance();

    public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authenticationManager,
                                                      JwtConfig jwtConfig) {

        this.authenticationManager = authenticationManager;
        this.jwtConfig = jwtConfig;

        this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(jwtConfig.getAuthUri(), "POST"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            UserCredentials userCredentials = new ObjectMapper().readValue(request.getInputStream(), UserCredentials.class);
            userService.setUserCredentials(userCredentials);
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    userCredentials.getEmail(), userCredentials.getPassword(), Collections.emptyList());
            log.debug("usernamePasswordAuthenticationToken: {}", usernamePasswordAuthenticationToken);
            return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        Date now = new Date();
        String token = Jwts.builder()
                .setSubject(authResult.getName())
                .claim("authorities", authResult.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtConfig.getExpirationMilliseconds() * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes())
                .compact();
        log.debug("token: {}", token);
        response.addHeader(jwtConfig.getHeader(), jwtConfig.getPrefix() + token);
    }
}
