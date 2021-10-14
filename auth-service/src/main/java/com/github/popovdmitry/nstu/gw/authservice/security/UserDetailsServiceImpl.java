package com.github.popovdmitry.nstu.gw.authservice.security;

import com.github.popovdmitry.nstu.gw.authservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.authservice.model.UserCredentials;
import com.github.popovdmitry.nstu.gw.authservice.service.CustomerFeignClient;
import com.github.popovdmitry.nstu.gw.authservice.service.UserService;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService = UserService.getInstance();
    private final CustomerFeignClient customerFeignClient;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserCredentials userCredentials = userService.getUserCredentials();
        if (userCredentials.getEmail().equals(username)) {
            switch (userCredentials.getUserRole()) {
                case CUSTOMER -> {
                    try {
                        EncodedPasswordDto encodedPasswordDto = customerFeignClient.getEncodedPasswordByEmail(username).getBody();
                        log.debug("CUSTOMER");
                        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                                .commaSeparatedStringToAuthorityList("ROLE_" + userCredentials.getUserRole());
                        return new User(userCredentials.getEmail(), encodedPasswordDto.getEncodedPassword(), grantedAuthorities);
                    }
                    catch (FeignException.NotFound e) {
                        throw new UsernameNotFoundException("User with email " + username + " is not found");
                    }
                    catch (FeignException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        }
        throw new UsernameNotFoundException("User with email " + username + " is not found");
    }
}
