package com.example.checkoutsvc;

import com.example.checkoutsvc.outbound_requesting_code.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    private String hostname;

    @Autowired
    RestService restService;


    @RequestMapping(path = "/{username}", method = RequestMethod.POST)
    public void placeOrder(@RequestBody Map<String, Object> body, @PathVariable String username) {
        String cc = body.get("cardNumber").toString();
        String email = body.get("email").toString();
        if (!cc.isEmpty() && verifyCC(cc)) {
            sendEmail(email);
            clearCart(username);
        }
    }

    private Boolean verifyCC(String cardNumber) {
        if (cardNumber.startsWith("4") || cardNumber.startsWith("5")) {
            return true;
        }
        return false;
    }

    private void sendEmail(String email) {
//        InetAddress ip;
//        try {
//            ip = InetAddress.getLocalHost();
//            hostname = ip.getHostName();
//        } catch (UnknownHostException e) {
//            e.printStackTrace();
//        }
        String url = "http://email-service:8080/email/send";
        restService.sendEmail(url, email);
    }

    private void clearCart(String username) {

        String url = "http://cart-service:8080/cart/clearCart/" + username;
        restService.clearCart(url);

    }
}
