package com.github.popovdmitry.nstu.gw.sellerservice.exceprion;

public class NotUniqueEmailException extends Exception {
    public NotUniqueEmailException(String message) {
        super(message);
    }

    public NotUniqueEmailException() {
        super();
    }
}
