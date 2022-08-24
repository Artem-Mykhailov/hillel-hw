"use strict";

const TODO_ITEM_SELECTOR = ".todoItem";
const DELETE_BTN_CLASS = "deleteBtn";
const EDIT_BTN_CLASS = "editBtn";
const EDIT_LI_CLASS = "editLi";
const SELECT_LI_CLASS = "selectLi";
const URL = "https://62e664e269bd03090f6fd3ad.mockapi.io/todo/";

const todoList = document.querySelector(".to-do-list");
const input = document.querySelector("#input-text");
const todoForm = document.querySelector(".do-list");

todoForm.addEventListener("submit", onTodoformSubmit);
todoList.addEventListener("click", onTodolistClick);

getTodoList().then(renderTodoList);

function onTodoformSubmit(e) {
  e.preventDefault();
  const action = getMessage();

  if (!isInputValid(action)) {
    showError();
    return;
  }

  createTodo(action).then((act) => {
    renderAction(act);
    clearInput();
  });
}

function onTodolistClick(e) {
  const todoItem = getTodoItem(e.target);
  const classList = e.target.classList;
  const id = getIdTodoItem(e.target);

  if (todoItem) {
    if (classList.contains(DELETE_BTN_CLASS)) {
      deleteTodo(id).then(todoItem.remove());
      return;
    }

    if (classList.contains(EDIT_BTN_CLASS)) {
      todoItem.classList.toggle(EDIT_LI_CLASS);
      return;
    }

    todoItem.classList.toggle(SELECT_LI_CLASS);

    const status = getTodoStatus(todoItem);
    changeTodoStatus(id, status);
  }
}

function getMessage() {
  return {
    title: input.value,
    status: false,
  };
}

function isInputValid(act) {
  return act.title.trim() !== "";
}

function showError() {
  alert("Your Action must consist something, try again.");
}

function createTodo(act) {
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(act),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Something went wrong, try again!");
  });
}

function renderAction(act) {
  const todoItemTemplateHTML = generateTodoHTML(act);

  todoList.insertAdjacentHTML("beforeend", todoItemTemplateHTML);
}

function clearInput() {
  input.value = "";
}

function getTodoItem(el) {
  return el.closest(TODO_ITEM_SELECTOR);
}

function getIdTodoItem(el) {
  return el.closest(TODO_ITEM_SELECTOR).dataset.id;
}

function deleteTodo(id) {
  return fetch(URL + id, {
    method: "DELETE",
  }).then((res) => res.text);
}

function getTodoStatus(el) {
  let status;

  status = el.classList.contains(SELECT_LI_CLASS) ? true : false;

  return status;
}

function changeTodoStatus(id, status) {
  return fetch(URL + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ status: status }),
  }).then((res) => res.json);
}

function getTodoList() {
  return fetch(URL).then((res) => res.json());
}

function renderTodoList(list) {
  const html = list.map(generateTodoHTML).join("");

  todoList.insertAdjacentHTML("beforeend", html);
}

function generateTodoHTML(todoItem) {
  const status = todoItem.status ? "selectLi" : "";

  return `
    <li 
    class='todoItem ${status}'
    data-id='${todoItem.id}'
    >
      <p class='item-general'>${todoItem.title}</p>
      <button type='button' class='editBtn btn-general'>Edit</button>
      <button type='button' class='deleteBtn btn-general'>Delete</button>
    </li>
    `;
}
