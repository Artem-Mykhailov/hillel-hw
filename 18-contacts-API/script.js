"use strict";

const CONTACTS_ITEM_SELECTOR = ".contactsItem";
const DELETE_BTN_CLASS = "deleteBtn";
const EDIT_BTN_CLASS = "editBtn";
const EDIT_LI_CLASS = "editLi";
const SELECT_LI_CLASS = "selectLi";

const contactForm = document.querySelector("#contacts");
const contactInputs = document.querySelector("#inputs");
const contactList = document.querySelector(".contact-list");
let contacts = [];

contactForm.addEventListener("submit", onContactFormSubmit);
contactList.addEventListener("click", onContactListClick);

ContactsApi.getList()
  .then((contact) => {
    contacts = contact;

    renderContactList(contact);
  })
  .catch(showError);

function onContactFormSubmit(e) {
  e.preventDefault();
  const contact = getContact();

  if (!isValidContact(contact)) {
    showIncorrectInput();
    return;
  }

  if (contact.id) {
    ContactsApi.update(contact.id, contact)
      .then(ContactsApi.getList)
      .then(renderContactList)
      .then(clearInputs)
      .catch(showError);
  } else {
    ContactsApi.create(contact)
      .then((newContact) => {
        renderContact(newContact);
        clearInputs();
      })
      .catch(showError);
  }
}

function onContactListClick(e) {
  const contactItem = getContactItem(e.target);
  const classList = e.target.classList;
  const id = getContactItemId(e.target);
  const contact = contacts.find((contactItem) => contactItem.id === id);

  if (contactItem) {
    if (classList.contains(DELETE_BTN_CLASS)) {
      ContactsApi.delete(id).catch(showError);
      contactItem.remove();
      return;
    }

    if (classList.contains(EDIT_BTN_CLASS)) {
      fillForm(contact);
      contactItem.classList.toggle(EDIT_LI_CLASS);
      return;
    }

    contactItem.classList.toggle(SELECT_LI_CLASS);

    const status = getContactItemStatus(contactItem);
    ContactsApi.update(id, { status: status }).catch(showError);
  }
}

function getContact() {
  const { id, userName, userSurname, userTelNumber } = contactInputs.children;
  const contactEl =
    contacts.find((contactItem) => contactItem.id === id.value) || {};

  return {
    status: false,
    ...contactEl,
    firstName: userName.value,
    lastName: userSurname.value,
    phoneNumber: userTelNumber.value,
  };
}

function renderContactList(contact) {
  const html = contact.map(generateContactHTML).join("");

  contactList.innerHTML = html;
}

function isValidContact(contact) {
  return (
    isEmptyInput(contact.firstName) &&
    isEmptyInput(contact.lastName) &&
    isCorrectPhone(contact.phoneNumber)
  );
}

function isEmptyInput(input) {
  return input.trim() !== "";
}

function isCorrectPhone(phone) {
  return isEmptyInput(phone) && !isNaN(phone);
}

function showError(e) {
  alert(e.message);
}

function showIncorrectInput() {
  alert("Some field is incorrect! Try again.");
}

function renderContact(contact) {
  const contactItemTemplateHTML = generateContactHTML(contact);

  contactList.insertAdjacentHTML("beforeend", contactItemTemplateHTML);
}

function generateContactHTML(contact) {
  const status = contact.status ? "selectLi" : "";

  return `
  <li 
  class='contactsItem ${status}'
  data-id="${contact.id}"
  >
    <p class='item-general'>${contact.firstName}</p>
    <p class='item-general'>${contact.lastName}</p>
    <p class='item-general'>${contact.phoneNumber}</p>
    <button type='button' class='editBtn btn-general'>Edit</button>
    <button type='button' class='deleteBtn btn-general'>Delete</button>
  </li>
`;
}

function clearInputs() {
  contactForm.reset();
}

function getContactItem(el) {
  return el.closest(CONTACTS_ITEM_SELECTOR);
}

function getContactItemId(el) {
  return el.closest(CONTACTS_ITEM_SELECTOR).dataset.id;
}

function getContactItemStatus(el) {
  let status;

  status = el.classList.contains(SELECT_LI_CLASS) ? true : false;

  return status;
}

function fillForm(contact) {
  const { id, userName, userSurname, userTelNumber } = contactInputs.children;
  id.value = contact.id;
  userName.value = contact.firstName;
  userSurname.value = contact.lastName;
  userTelNumber.value = contact.phoneNumber;
}
