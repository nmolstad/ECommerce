package com.example.checkoutsvc;

import com.example.checkoutsvc.outbound_requesting_code.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Map;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    private String hostname;

    @Autowired
    RestService restService;


    @RequestMapping(path = "/", method = RequestMethod.POST)
    public void placeOrder(@RequestBody Map<String, Object> body) {
        String cc = body.get("cardNumber").toString();
        String email = body.get("email").toString();
        if (!cc.isEmpty() && verifyCC(cc)) {
            sendEmail(email);
            clearCart();
        }
    }

    private Boolean verifyCC(String cardNumber) {
        if(cardNumber.startsWith("4") || cardNumber.startsWith("5")){
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

    private void clearCart() {

    }
}
