"use strict";
const ul = document.querySelector(".to-do-list");
const input = document.querySelector("#input-text");
const button = document.querySelector("#btn");

button.addEventListener("click", onButtonClick);

function onButtonClick() {
  const message = getMessage();

  if (!isInputValid(message)) {
    showError();
    return;
  }

  addAction(message);
  clearInput();
}

function getMessage() {
  return input.value;
}

function isInputValid(message) {
  return message.trim() !== "";
}

function showError() {
  alert("Your Action must consist something, try again.");
}

function addAction(message) {
  const li = document.createElement("li");
  li.textContent = message;
  ul.append(li);
}

function clearInput() {
  input.value = "";
}
