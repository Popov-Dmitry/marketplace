package com.github.popovdmitry.nstu.gw.authservice.service;

import com.github.popovdmitry.nstu.gw.authservice.model.UserCredentials;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@NoArgsConstructor
public class UserService {

    private UserCredentials userCredentials;
    private static UserService userService;

    public static UserService getInstance() {
        if (userService == null) {
            userService = new UserService();
        }
        return userService;
    }

    public UserCredentials getUserCredentials() {
        return userCredentials;
    }

    public void setUserCredentials(UserCredentials userCredentials) {
        this.userCredentials = userCredentials;
    }
}
