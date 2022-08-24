"use strict";
const TODO_ITEM_SELECTOR = ".todoItem";
const DELETE_BTN_CLASS = "deleteBtn";
const EDIT_BTN_CLASS = "editBtn";
const EDIT_LI_CLASS = "editLi";
const SELECT_LI_CLASS = "selectLi";

const todoList = document.querySelector(".to-do-list");
const input = document.querySelector("#input-text");
const todoForm = document.querySelector(".do-list");
const todoItemTemplate = document.querySelector("#todoItemTemplate").innerHTML;

todoForm.addEventListener("submit", onTodoformSubmit);
todoList.addEventListener("click", onTodolistClick);

function onTodoformSubmit(e) {
  e.preventDefault();
  const action = getMessage();

  if (!isInputValid(action)) {
    showError();
    return;
  }

  addAction(action);
  clearInput();
}

function onTodolistClick(e) {
  const todoItem = getTodoItem(e.target);
  const classList = e.target.classList;

  if (todoItem) {
    if (classList.contains(DELETE_BTN_CLASS)) {
      todoItem.remove();
      return;
    }

    if (classList.contains(EDIT_BTN_CLASS)) {
      todoItem.classList.toggle(EDIT_LI_CLASS);
      return;
    }

    todoItem.classList.toggle(SELECT_LI_CLASS);
  }
}

function getMessage() {
  return input.value;
}

function isInputValid(act) {
  return act.trim() !== "";
}

function showError() {
  alert("Your Action must consist something, try again.");
}

function addAction(act) {
  const todoItemTemplateHTML = generateTodoHTML(act);

  todoList.insertAdjacentHTML("beforeend", todoItemTemplateHTML);
}

function generateTodoHTML(act) {
  return todoItemTemplate.replace("{Action}", act);
}

function clearInput() {
  input.value = "";
}

function getTodoItem(el) {
  return el.closest(TODO_ITEM_SELECTOR);
}
