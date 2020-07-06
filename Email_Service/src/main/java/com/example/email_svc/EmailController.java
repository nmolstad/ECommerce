package com.example.email_svc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailSVCImpl mailer;

    @RequestMapping(path = "/send", method = RequestMethod.POST)
    public void sendEmail(@RequestBody Map<String, String> body) throws Exception {
        String message = body.get("message");
        String to = body.get("to");
        String from = "commerce.email.svc@gmail.com";
        mailer.sendSimpleMessage(to, from, message);
    }
}
