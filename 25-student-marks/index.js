// 1. Добавление студентов с апи на страничку
// 2. При заполнении формы - новый студент без оценок
// 3. Удаление студента
// 4. Изменение выбранной оценки в массиве

"use strict";

const FORM_SELECTOR = ".student-form";

let studentList = [];

const $studentList = $(".students");

StudentApi.getList()
  .then((student) => {
    studentList = student;

    renderStudentList(student);
  })
  .catch(showError);

function renderStudentList(student) {
  const html = student.map(generateStudentHTML).join("");

  $studentList.html(html);
}

function generateStudentHTML(student) {
  return `
    <div
    class='studentItem'
    data-id="${student.id}"
    >
    <div class="student-name-block">
      <p class="student-name">${student.name}</p>
      </div>
      <div id="marks">
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[0]}"/>
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[1]}"/>
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[2]}"/>
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[3]}"/>
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[4]}"/>
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[5]}"/>
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[6]}"/>
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[7]}"/>
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[8]}"/>
      <input type="number" name="studentMark" class="input-mark" value="${student.marks[9]}"/>
      </div>
      <div>
      <button type='button' class='deleteBtn btn-general'>Delete</button>
      </div>
    </div>
  `;
}

function showError(e) {
  alert(e.message);
}

// const CONTACTS_ITEM_SELECTOR = ".contactsItem";
// const MODAL_SELECTOR = "#contactModal";
// const ADD_CONTACT_SELECTOR = "#btn";
// const CONTACT_LIST_SELECTOR = ".contact-list";
// const DELETE_BTN_SELECTOR = ".deleteBtn";
// const EDIT_BTN_SELECTOR = ".editBtn";
// const EDIT_STATUS_SELECTOR = "#status";
// const SELECT_LI_CLASS = "selectLi";

// const EMPTY_CONTACT = {
//   status: false,
//   id: "",
//   firstName: "",
//   lastName: "",
//   phoneNumber: "",
// };
// let contacts = [];

// const $contactList = $(CONTACT_LIST_SELECTOR)
//   .on("click", EDIT_STATUS_SELECTOR, onEditStatusClick)
//   .on("click", DELETE_BTN_SELECTOR, onDeleteBtnClick)
//   .on("click", EDIT_BTN_SELECTOR, onEditBtnClick);

//     // Save: () => {
//     //   const contact = getContact();

//     //   if (!isValidContact(contact)) {
//     //     showIncorrectInput();
//     //     return;
//     //   }

//     //   if (contact.id) {
//     //     updateContact(contact.id, contact);
//     //   } else {
//     //     createContact(contact);
//     //   }

// $(ADD_CONTACT_SELECTOR).on("click", onAddContactBtnClick);

// ContactsApi.getList()
//   .then((contact) => {
//     contacts = contact;

//     renderContactList(contact);
//   })
//   .catch(showError);

// function onAddContactBtnClick(e) {
//   openModal(EMPTY_CONTACT);
// }

// function onEditStatusClick(e) {
//   const id = getElementId($(this));
//   const $contact = getContactEl($(this));

//   $contact.toggleClass(SELECT_LI_CLASS);

//   const status = getContactItemStatus($contact);
//   ContactsApi.update(id, { status: status }).catch(showError);
// }

// function onDeleteBtnClick(e) {
//   const id = getElementId($(this));

//   deleteContact(id);
// }

// function onEditBtnClick(e) {
//   const id = getElementId($(this));
//   const contact = contacts.find((item) => item.id === id);

//   openModal(contact);
// }

// function openModal(contact) {
//   fillForm(contact);
//   $modal.dialog("open");
// }

// function closeModal() {
//   $modal.dialog("close");
// }

// function fillForm(contact) {
//   $form.id.value = contact.id;
//   $form.userName.value = contact.firstName;
//   $form.userSurname.value = contact.lastName;
//   $form.userTelNumber.value = contact.phoneNumber;
// }

// function getContact() {
//   return {
//     ...EMPTY_CONTACT,
//     id: $form.id.value,
//     firstName: $form.userName.value,
//     lastName: $form.userSurname.value,
//     phoneNumber: $form.userTelNumber.value,
//   };
// }

// function createContact(contact) {
//   ContactsApi.create(contact)
//     .then((newContact) => {
//       renderContact(newContact);
//       contacts.push(newContact);
//     })
//     .catch(showError);
// }

// function renderContact(contact) {
//   const html = generateContactHTML(contact);

//   $contactList.append(html);
// }

// function getElementId($el) {
//   const $contact = getContactEl($el);

//   return String($contact.data("id"));
// }

// function getContactEl($el) {
//   return $el.closest(CONTACTS_ITEM_SELECTOR);
// }

// function deleteContact(id) {
//   ContactsApi.delete(id)
//     .then(() => {
//       const $contact = findContactElById(id);
//       contacts = contacts.filter((item) => item.id !== id);

//       $contact.remove();
//     })
//     .catch(showError);
// }

// function updateContact(id, changes) {
//   ContactsApi.update(id, changes).then(() => {
//     const contact = contacts.find((item) => item.id === id);
//     const $contact = findContactElById(id);

//     Object.keys(changes).forEach((key) => (contact[key] = changes[key]));

//     $contact.replaceWith(generateContactEl(contact));
//   });
// }

// function generateContactEl(contact) {
//   const $contact = $(generateContactHTML(contact));

//   return $contact;
// }

// function findContactElById(id) {
//   return $contactList.find(`[data-id="${id}"]`);
// }

// function getContactItemStatus($el) {
//   return $el.hasClass(SELECT_LI_CLASS);
// }

// function isValidContact(contact) {
//   return (
//     isEmptyInput(contact.firstName) &&
//     isEmptyInput(contact.lastName) &&
//     isCorrectPhone(contact.phoneNumber)
//   );
// }

// function isEmptyInput(input) {
//   return input.trim() !== "";
// }

// function isCorrectPhone(phone) {
//   return isEmptyInput(phone) && !isNaN(phone);
// }

// function showIncorrectInput() {
//   alert("Some field is incorrect! Try again.");
// }
