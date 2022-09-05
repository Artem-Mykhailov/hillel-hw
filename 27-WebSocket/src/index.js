"use strict";

import $ from "jquery";
import "./styles/style.css";
import style from "./styles/module.m.css";

const FORM_MESSAGE_SELECTOR = "#form-message";
const CHAT_MESSAGES_SELECTOR = ".messages";

const $form = $(`${FORM_MESSAGE_SELECTOR}`)[0];
const EMPTY_MESSAGE = {
  username: "",
  message: "",
};

let socket;
initConnection();

$(FORM_MESSAGE_SELECTOR).on("submit", onFormSubmit);

function initConnection() {
  socket = new WebSocket("wss://fep-app.herokuapp.com");
}

function onFormSubmit(e) {
  e.preventDefault();

  const message = getMessage();

  sendMessage(message);
  loveTest(message);
  ingTest(message);
  resetForm();
}

function getMessage() {
  return {
    ...EMPTY_MESSAGE,
    username: $form.username.value,
    message: $form.message.value,
  };
}

function sendMessage(message) {
  return socket.send(
    JSON.stringify({
      username: message.username,
      message: message.message,
    })
  );
}

function loveTest(message) {
  if (/love/.test(message.message)) {
    socket.send(
      JSON.stringify({
        username: "System",
        message: "We love you too!",
      })
    );
  }
  return;
}
function ingTest(message) {
  if (/ing$/.test(message.message)) {
    socket.send(
      JSON.stringify({
        username: "System",
        message: "You message ends on 'ing'",
      })
    );
  }
  return;
}

function resetForm() {
  $form.reset();
}

socket.onopen = () => {
  socket.send(
    JSON.stringify({
      username: "System",
      message: "New user connected",
    })
  );
};

socket.onmessage = (event) => {
  try {
    const message = JSON.parse(event.data);
    $(
      `<p class='${style.messagesText}'>${message.username}: ${message.message}</p>`
    ).appendTo($(CHAT_MESSAGES_SELECTOR));
  } catch (e) {
    console.log("ignore error");
  }
};

socket.onclose = () => {
  initConnection();
};

socket.onerror = (event) => {
  console.log("Error", event.data);
};
