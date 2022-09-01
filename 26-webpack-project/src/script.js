"use strict";

import "./styles/style.css";
import style from "./styles/modal.module.css";
import ContactsApi from "./ContactAPI";
import $ from "jquery";
import ContactTemplate from "./ContactTemplate.html";

require("jquery-ui/ui/widgets/dialog");

const CONTACTS_ITEM_SELECTOR = ".contactsItem";
const MODAL_SELECTOR = "#contactModal";
const ADD_CONTACT_SELECTOR = "#btn";
const CONTACT_LIST_SELECTOR = ".contact-list";
const DELETE_BTN_SELECTOR = ".deleteBtn";
const EDIT_BTN_SELECTOR = ".editBtn";
const EDIT_STATUS_SELECTOR = "#status";

const EMPTY_CONTACT = {
  status: false,
  id: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
};
let contacts = [];

const $contactList = $(CONTACT_LIST_SELECTOR)
  .on("click", EDIT_STATUS_SELECTOR, onEditStatusClick)
  .on("click", DELETE_BTN_SELECTOR, onDeleteBtnClick)
  .on("click", EDIT_BTN_SELECTOR, onEditBtnClick);

const $form = $(`${MODAL_SELECTOR} form`)[0];
const $modal = $(MODAL_SELECTOR).dialog({
  autoOpen: false,
  modal: true,
  minWidth: 400,
  show: {
    effect: "blind",
    duration: 1000,
  },
  hide: {
    effect: "explode",
    duration: 1000,
  },
  buttons: {
    Save: () => {
      const contact = getContact();

      if (!isValidContact(contact)) {
        showIncorrectInput();
        return;
      }

      if (contact.id) {
        updateContact(contact.id, contact);
      } else {
        createContact(contact);
      }
      closeModal();
    },
    Cancel: closeModal,
  },
  close: closeModal,
});

$(ADD_CONTACT_SELECTOR).on("click", onAddContactBtnClick);

ContactsApi.getList()
  .then((contact) => {
    contacts = contact;

    renderContactList(contact);
  })
  .catch(showError);

function onAddContactBtnClick(e) {
  openModal(EMPTY_CONTACT);
}

function onEditStatusClick(e) {
  const id = getElementId($(this));
  const $contact = getContactEl($(this));

  $contact.toggleClass(style.selectLi);

  const status = getContactItemStatus($contact);
  ContactsApi.update(id, { status: status }).catch(showError);
}

function onDeleteBtnClick(e) {
  const id = getElementId($(this));

  deleteContact(id);
}

function onEditBtnClick(e) {
  const id = getElementId($(this));
  const contact = contacts.find((item) => item.id === id);

  openModal(contact);
}

function openModal(contact) {
  fillForm(contact);
  $modal.dialog("open");
}

function closeModal() {
  $modal.dialog("close");
}

function fillForm(contact) {
  $form.id.value = contact.id;
  $form.userName.value = contact.firstName;
  $form.userSurname.value = contact.lastName;
  $form.userTelNumber.value = contact.phoneNumber;
}

function getContact() {
  return {
    ...EMPTY_CONTACT,
    id: $form.id.value,
    firstName: $form.userName.value,
    lastName: $form.userSurname.value,
    phoneNumber: $form.userTelNumber.value,
  };
}

function createContact(contact) {
  ContactsApi.create(contact)
    .then((newContact) => {
      renderContact(newContact);
      contacts.push(newContact);
    })
    .catch(showError);
}

function renderContact(contact) {
  const html = generateContactHTML(contact);

  $contactList.append(html);
}

function renderContactList(contact) {
  const html = contact.map(generateContactHTML).join("");

  $contactList.html(html);
}

function getElementId($el) {
  const $contact = getContactEl($el);

  return String($contact.data("id"));
}

function getContactEl($el) {
  return $el.closest(CONTACTS_ITEM_SELECTOR);
}

function generateContactHTML(contact) {
  const status = contact.status ? style.selectLi : "";
  const checked = contact.status ? "checked" : "";

  return ContactTemplate.replace("{status}", status)
    .replace("{contact.id}", contact.id)
    .replace("{checked}", checked)
    .replace("{contact.firstName}", contact.firstName)
    .replace("{contact.lastName}", contact.lastName)
    .replace("{contact.phoneNumber}", contact.phoneNumber);
}

function deleteContact(id) {
  ContactsApi.delete(id)
    .then(() => {
      const $contact = findContactElById(id);
      contacts = contacts.filter((item) => item.id !== id);

      $contact.remove();
    })
    .catch(showError);
}

function updateContact(id, changes) {
  ContactsApi.update(id, changes).then(() => {
    const contact = contacts.find((item) => item.id === id);
    const $contact = findContactElById(id);

    Object.keys(changes).forEach((key) => (contact[key] = changes[key]));

    $contact.replaceWith(generateContactEl(contact));
  });
}

function generateContactEl(contact) {
  const $contact = $(generateContactHTML(contact));

  return $contact;
}

function findContactElById(id) {
  return $contactList.find(`[data-id="${id}"]`);
}

function getContactItemStatus($el) {
  return $el.hasClass(style.selectLi);
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
