package com.github.popovdmitry.nstu.gw.authservice.security;

import com.github.popovdmitry.nstu.gw.authservice.dto.EncodedPasswordDto;
import com.github.popovdmitry.nstu.gw.authservice.model.UserCredentials;
import com.github.popovdmitry.nstu.gw.authservice.service.*;
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

import javax.management.relation.RoleNotFoundException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService = UserService.getInstance();
    private final CustomerFeignClient customerFeignClient;
    private final SellerFeignClient sellerFeignClient;
    private final ModerFeignClient moderFeignClient;
    private final AdminFeignClient adminFeignClient;

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
                case SELLER -> {
                    try {
                        EncodedPasswordDto encodedPasswordDto = sellerFeignClient.getEncodedPasswordByEmail(username).getBody();
                        log.debug("SELLER");
                        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                                .commaSeparatedStringToAuthorityList("ROLE_" + userCredentials.getUserRole());
                        return new User(userCredentials.getEmail(), encodedPasswordDto.getEncodedPassword(), grantedAuthorities);
                    }
                    catch (FeignException.NotFound e) {
                        throw new UsernameNotFoundException("Seller with email " + username + " is not found");
                    }
                    catch (FeignException e) {
                        throw new RuntimeException(e);
                    }
                }
                case ADMIN -> {
                    try {
                        EncodedPasswordDto encodedPasswordDto = adminFeignClient.getEncodedPasswordByEmail(username).getBody();
                        log.debug("ADMIN");
                        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                                .commaSeparatedStringToAuthorityList("ROLE_" + userCredentials.getUserRole());
                        return new User(userCredentials.getEmail(), encodedPasswordDto.getEncodedPassword(), grantedAuthorities);
                    }
                    catch (FeignException.NotFound e) {
                        throw new UsernameNotFoundException("Admin with email " + username + " is not found");
                    }
                    catch (FeignException e) {
                        throw new RuntimeException(e);
                    }
                }
                case MODER -> {
                    try {
                        EncodedPasswordDto encodedPasswordDto = moderFeignClient.getEncodedPasswordByEmail(username).getBody();
                        log.debug("MODER");
                        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                                .commaSeparatedStringToAuthorityList("ROLE_" + userCredentials.getUserRole());
                        return new User(userCredentials.getEmail(), encodedPasswordDto.getEncodedPassword(), grantedAuthorities);
                    }
                    catch (FeignException.NotFound e) {
                        throw new UsernameNotFoundException("Moder with email " + username + " is not found");
                    }
                    catch (FeignException e) {
                        throw new RuntimeException(e);
                    }
                }
                default -> throw new UsernameNotFoundException("Role " + userCredentials.getUserRole() + " does not exist");
            }
        }
        throw new UsernameNotFoundException("User with email " + username + " is not found");
    }
}
