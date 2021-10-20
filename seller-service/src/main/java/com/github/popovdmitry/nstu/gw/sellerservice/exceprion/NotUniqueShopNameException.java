package com.github.popovdmitry.nstu.gw.sellerservice.exceprion;

public class NotUniqueShopNameException extends Exception {
    public NotUniqueShopNameException(String message) {
        super(message);
    }

    public NotUniqueShopNameException() {
        super();
    }
}
