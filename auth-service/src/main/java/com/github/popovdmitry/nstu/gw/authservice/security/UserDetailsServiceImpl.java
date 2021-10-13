package com.github.popovdmitry.nstu.gw.authservice.security;

import com.github.popovdmitry.nstu.gw.authservice.model.UserCredentials;
import com.github.popovdmitry.nstu.gw.authservice.service.CustomerFeignClient;
import com.github.popovdmitry.nstu.gw.authservice.service.UserService;
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
                    if (customerFeignClient.isUserExists(username)) {
                        System.out.println("CUSTOMER");
                        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                                .commaSeparatedStringToAuthorityList("ROLE_" + userCredentials.getUserRole());
                        return new User(userCredentials.getEmail(), userCredentials.getPassword(), grantedAuthorities);
                    }
                }
            }
        }
        throw new UsernameNotFoundException("User with email " + username + " is not found");
    }
}
