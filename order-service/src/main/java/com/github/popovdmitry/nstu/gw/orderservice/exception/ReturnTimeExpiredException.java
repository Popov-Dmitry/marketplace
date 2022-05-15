package com.github.popovdmitry.nstu.gw.orderservice.exception;

public class ReturnTimeExpiredException extends Exception {
    public ReturnTimeExpiredException() {
        super();
    }

    public ReturnTimeExpiredException(String message) {
        super(message);
    }
}
