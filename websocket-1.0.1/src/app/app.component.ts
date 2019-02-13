import { Component } from "@angular/core";
import * as Stomp from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import * as $ from "jquery";
import { sendRequest } from "selenium-webdriver/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // title = 'websocket';
  // tslint:disable-next-line:semicolon
  serverUrl = "http://localhost:8081/socket";
  title = "WebSockets chat";
  stompClient;
  chatdata;
  topicdata;
  jsondata;
  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", message => {
        if (message.body) {
          that.chatdata = message.body;
          console.log("data is ", that.chatdata);
          console.log("message body is ", message.body);
        }
      });
      that.stompClient.subscribe("/topic", message => {
        if (message.body) {
          that.topicdata = message.body;
          console.log("data is ", that.topicdata);
          console.log("message body is ", message.body);
        }
      });
      that.stompClient.subscribe("/json", message => {
        if (message.body) {
          that.jsondata = message.body;
          console.log("data is ", that.jsondata);
          console.log("message body is ", message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send("/app/user", {}, message);
    $("#input").val("");
    console.log("Inside the send message");
  }

  sendObj(message) {
    this.stompClient.send("/app/obj", {}, message);
    // $("#input").val("");
    console.log("Inside the send obj");
  }

  sendJson() {
    const details = {
      id: 1,
      name: "madhu"
    };
    this.stompClient.send("/app/json", {}, JSON.stringify(details));
    // $("#input").val("");
    console.log("Inside the send obj");
  }

  // sendObject() {
  //   const user = {
  //     id: 1,
  //     name: "madhu"
  //   };

  //   this.stompClient.send("/app/send/user", {}, user);
  //   console.log("inside the send object method");
  // }
}
