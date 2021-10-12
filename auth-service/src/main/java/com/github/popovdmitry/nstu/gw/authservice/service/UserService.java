package com.github.popovdmitry.nstu.gw.authservice.service;

import com.github.popovdmitry.nstu.gw.authservice.model.UserCredentials;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@NoArgsConstructor
public class UserService {

    private UserCredentials userCredentials;

    public void push(UserCredentials userCredentials) {
        this.userCredentials = userCredentials;
    }

    public UserCredentials pop() {
        return userCredentials;
    }
}
