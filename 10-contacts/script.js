"use strict";
const DELETE_BTN_CLASS = "deleteBtn";
const CONTACTS_ITEM_SELECTOR = ".contactsItem";

const contactForm = document.querySelector("#contacts");
const contactList = document.querySelector(".contact-list");
const inputs = document.querySelectorAll(".input-general");
const contactItemTemplate = document.querySelector(
  "#contactItemTemplate"
).innerHTML;

contactForm.addEventListener("submit", onContactFormSubmit);
contactList.addEventListener("click", onContactListClick);

function onContactFormSubmit(e) {
  e.preventDefault();
  const contact = getContact();

  if (!isValidContact(contact)) {
    showError();
    return;
  }

  addContactItem(contact);
  clearInputs(inputs);
}

function onContactListClick(e) {
  const classList = e.target.classList;

  if (classList.contains(DELETE_BTN_CLASS)) {
    const deleteBtn = getDeleteBtn(e.target);

    deleteBtn.remove();
  }
}

function getContact() {
  const contact = {};

  for (const currentInput of inputs) {
    contact[currentInput.name] = currentInput.value;
  }

  return contact;
}

function isValidContact(contact) {
  return (
    isEmptyInput(contact.userName) &&
    isEmptyInput(contact.userSurname) &&
    isCorrectPhone(contact.userTelNumber)
  );
}

function isEmptyInput(input) {
  return input.trim() !== "";
}

function isCorrectPhone(phone) {
  return isEmptyInput(phone) && !isNaN(phone);
}

function showError() {
  alert("Some fields have incorrect symbols or empty. Try  again!");
}

function addContactItem(contact) {
  const contactItemTemplateHTML = generateContactHTML(contact);

  contactList.insertAdjacentHTML("beforeend", contactItemTemplateHTML);
}

function generateContactHTML(contact) {
  return contactItemTemplate
    .replace("{userName}", contact.userName)
    .replace("{userSurname}", contact.userSurname)
    .replace("{userTel}", contact.userTelNumber);
}

function clearInputs(inputs) {
  for (const currentInput of inputs) {
    currentInput.value = "";
  }

  return inputs;
}

function getDeleteBtn(el) {
  return el.closest(CONTACTS_ITEM_SELECTOR);
}
