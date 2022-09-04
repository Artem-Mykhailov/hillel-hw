// 1. принять данные инпутов
// 2. отправить их на сервер
// 3. вывести данные на страничку

"use strict";

import $ from "jquery";

const FORM_MESSAGE_SELECTOR = "#form-message";
const CHAT_MESSAGES_SELECTOR = ".messages";

const $form = $(`${FORM_MESSAGE_SELECTOR}`)[0];
const EMPTY_MESSAGE = {
  username: "",
  message: "",
};

let socket;

$(FORM_MESSAGE_SELECTOR).on("submit", onFormSubmit);

initConnection();

function onFormSubmit(e) {
  e.preventDefault();

  const message = getMessage();

  socket.send(
    JSON.stringify({
      username: message.username,
      message: message.message,
    })
  );

  $form.reset();
}

function getMessage() {
  return {
    ...EMPTY_MESSAGE,
    username: $form.username.value,
    message: $form.message.value,
  };
}

function initConnection() {
  socket = new WebSocket("wss://fep-app.herokuapp.com");
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
    $(`<p>${message.username}: ${message.message}</p>`).appendTo(
      $(CHAT_MESSAGES_SELECTOR)
    );
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
