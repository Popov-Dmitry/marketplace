package com.github.popovdmitry.nstu.gw.sellerservice.exceprion;

public class NotUniqueInnException extends Exception {
    public NotUniqueInnException(String message) {
        super(message);
    }

    public NotUniqueInnException() {
        super();
    }
}
