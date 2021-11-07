package com.github.popovdmitry.nstu.gw.moderservice.exception;

public class NotUniqueEmailException extends Exception {
    public NotUniqueEmailException(String message) {
        super(message);
    }

    public NotUniqueEmailException() {
        super();
    }
}
