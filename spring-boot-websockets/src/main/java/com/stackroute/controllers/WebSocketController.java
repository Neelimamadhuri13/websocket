package com.stackroute.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/user")
    public void onReceivedName(String user) throws Exception {
//        System.out.println("JSON format " + user);
        System.out.println("incoming user data is "+user);
//        this.template.convertAndSend("/chat", user);
        this.template.convertAndSend("/chat", user);
    }

    @MessageMapping("/obj")
    public void onReceivedObj(String obj) throws Exception {
//        System.out.println("JSON format " + user);
        System.out.println("incoming object data is "+obj);
        this.template.convertAndSend("/topic", obj);
    }

    @MessageMapping("/json")
    public void onReceivedJson(String json) throws Exception {
//        System.out.println("JSON format " + user);
        System.out.println("incoming json data is "+json);
        this.template.convertAndSend("/json", json);
    }


}
