"use strict";

const STUDENT_ITEM_SELECTOR = ".studentItem";
const DELETE_BTN_SELECTOR = ".deleteBtn";
const MARK_INPUT_SELECTOR = ".input-mark";

const $FORM_SELECTOR = $(".student-form");
const $studentList = $(".students");
const $input = $("#input-name");

const EMPTY_STUDENT = {
  name: "",
  marks: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
};

let studentList = [];

$FORM_SELECTOR.on("submit", onFormSubmit);
$studentList
  .on("click", DELETE_BTN_SELECTOR, onDeleteBtnClick)
  .on("focusout", MARK_INPUT_SELECTOR, onMarkInputFocusOut);

StudentApi.getList()
  .then((student) => {
    studentList = student;
    renderStudentList(student);
  })
  .catch(showError);

function onFormSubmit(e) {
  e.preventDefault();

  const student = getStudent();

  if (!isEmptyInput(student)) {
    showIncorrectInput();
    return;
  }

  createStudent(student);
  resetForm();
}

function onDeleteBtnClick(e) {
  const id = getElementId($(this));

  deleteStudent(id);
}

function onMarkInputFocusOut(e) {
  let studentItem = [];

  const $input = $(this);
  const id = getElementId($input);

  StudentApi.getStudent(id).then((student) => {
    studentItem.push(student);
    studentItem[0].marks[$input.attr("id") - 1] = $input.val();

    const changes = {
      marks: studentItem[0].marks,
    };

    updateStudent(id, changes);
  });
}

function createStudent(student) {
  StudentApi.create(student)
    .then((newStudent) => {
      renderStudent(newStudent);
      studentList.push(newStudent);
    })
    .catch(showError);
}

function getStudent() {
  return {
    ...EMPTY_STUDENT,
    name: $input.val(),
  };
}

function deleteStudent(id) {
  StudentApi.delete(id)
    .then(() => {
      const $student = findStudentElById(id);
      studentList = studentList.filter((item) => item.id !== id);
      $student.remove();
    })
    .catch(showError);
}

function updateStudent(id, changes) {
  StudentApi.update(id, changes).then(() => {
    const student = studentList.find((item) => item.id === id);

    Object.keys(changes).forEach((key) => (student[key] = changes[key]));
  });
}

function renderStudentList(student) {
  const html = student.map(generateStudentHTML).join("");

  $studentList.html(html);
}

function renderStudent(student) {
  const html = generateStudentHTML(student);

  $studentList.append(html);
}

function getElementId($el) {
  const $student = getStudentEl($el);

  return String($student.data("id"));
}

function getStudentEl($el) {
  return $el.closest(STUDENT_ITEM_SELECTOR);
}

function findStudentElById(id) {
  return $studentList.find(`[data-id="${id}"]`);
}

function resetForm() {
  $input.val("");
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
      <input id="1" type="number" name="studentMark" class="input-mark" value="${student.marks[0]}"/>
      <input id="2" type="number" name="studentMark" class="input-mark" value="${student.marks[1]}"/>
      <input id="3" type="number" name="studentMark" class="input-mark" value="${student.marks[2]}"/>
      <input id="4" type="number" name="studentMark" class="input-mark" value="${student.marks[3]}"/>
      <input id="5" type="number" name="studentMark" class="input-mark" value="${student.marks[4]}"/>
      <input id="6" type="number" name="studentMark" class="input-mark" value="${student.marks[5]}"/>
      <input id="7" type="number" name="studentMark" class="input-mark" value="${student.marks[6]}"/>
      <input id="8" type="number" name="studentMark" class="input-mark" value="${student.marks[7]}"/>
      <input id="9" type="number" name="studentMark" class="input-mark" value="${student.marks[8]}"/>
      <input id="10" type="number" name="studentMark" class="input-mark" value="${student.marks[9]}"/>
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

function isEmptyInput(student) {
  return student.name.trim() !== "";
}

function showIncorrectInput() {
  alert("The field is empty! Try again.");
}
