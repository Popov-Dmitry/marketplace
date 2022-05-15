package com.github.popovdmitry.nstu.gw.gatewayservice.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityTokenConfig extends WebSecurityConfigurerAdapter {

    private final JwtConfig jwtConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling().authenticationEntryPoint((httpServletRequest, httpServletResponse, e) ->
                        httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                .and()
                .addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, jwtConfig.getAuthUri()).permitAll()
                .antMatchers(HttpMethod.POST, "/customers/").permitAll()
                .antMatchers(HttpMethod.GET, "/customers/**").hasAnyRole("CUSTOMER", "SELLER", "ADMIN")
                .antMatchers("/customers/**").hasAnyRole("CUSTOMER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/sellers/").permitAll()
                .antMatchers(HttpMethod.GET, "/sellers/**").permitAll()
                .antMatchers("/sellers/**").hasAnyRole("SELLER", "ADMIN")
                .antMatchers("/verification/**").hasAnyRole("MODER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/moders/").hasRole("ADMIN")
                .antMatchers("/moders/**").hasAnyRole("MODER", "ADMIN")
                .antMatchers("/admins/**").hasRole("ADMIN")
                .antMatchers("/clothes/search").permitAll()
                .antMatchers(HttpMethod.POST, "/clothes/**").hasAnyRole("SELLER", "ADMIN")
                .antMatchers(HttpMethod.PATCH, "/clothes/**").hasAnyRole("SELLER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/clothes/**").hasAnyRole("SELLER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/clothes/**").permitAll()
                .antMatchers(HttpMethod.POST, "/photos/**").hasAnyRole("SELLER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/photos/**").hasAnyRole("SELLER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/photos/**").permitAll()
                .antMatchers("/carts/**").hasAnyRole("CUSTOMER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/orders/**").hasAnyRole("CUSTOMER", "ADMIN")
                .antMatchers(HttpMethod.PATCH, "/orders/**").hasAnyRole("SELLER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/orders/customers/**").hasAnyRole("CUSTOMER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/orders/sellers/**", "/orders/products/**").hasAnyRole("SELLER", "ADMIN")
                .antMatchers("/orders/**").hasAnyRole("CUSTOMER", "SELLER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/deliveries/addresses/**").hasAnyRole("CUSTOMER", "SELLER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/deliveries/addresses/customers/**").hasAnyRole("CUSTOMER", "ADMIN")
                .antMatchers("/deliveries/addresses/**").hasAnyRole("CUSTOMER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/deliveries/**").hasAnyRole("CUSTOMER", "SELLER", "ADMIN")
                .antMatchers("/deliveries/**").hasAnyRole("SELLER", "ADMIN")
                .anyRequest().authenticated();
    }
}
