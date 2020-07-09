package com.example.checkoutsvc;

public class CheckoutController {

    public void placeOrder() {
        if (verifyCC()) {
            sendEmail();
            clearCart();
        }
    }

    private Boolean verifyCC() {
        return null;
    }

    private void sendEmail() {

    }

    private void clearCart() {

    }
}
