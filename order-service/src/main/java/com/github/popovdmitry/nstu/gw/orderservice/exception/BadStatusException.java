package com.github.popovdmitry.nstu.gw.orderservice.exception;

public class BadStatusException extends Exception {
    public BadStatusException() {
        super();
    }

    public BadStatusException(String message) {
        super(message);
    }
}
