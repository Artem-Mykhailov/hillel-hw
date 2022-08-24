"use strict";

class Group {
  #students = [];

  addStudent(student) {
    if (this.#isValidStudent(student)) {
      this.#students.push(student);
    }
  }

  #isValidStudent(student) {
    return student instanceof Student;
  }

  getAverageMark() {
    const marks = this.#students.flatMap((student) => student.marks);
    const average = marks.reduce((a, b) => a + b, 0) / marks.length;

    return average;
  }

  get students() {
    return this.#students;
  }
}

class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }
}

const group = new Group();

group.addStudent(new Student("John", [10, 8]));
group.addStudent(new Student("Alex", [10, 9]));
group.addStudent(new Student("Bob", [6, 10]));

// При добавлении валидировать тип добавляемого объекта
// и если тип не Student - игнорировать. Функцию валидатор сделать приватной
console.log(group.students.length === 3);
group.addStudent({});
console.log(group.students.length === 3);

// Выводим средний балл группы
console.log(group.getAverageMark() === (10 + 8 + 10 + 9 + 6 + 10) / 6); // 8.83

// group.students = [new Student("John", [10, 10, 5, 10])]; Сделать group.students - readonly (Из-за use strict выдает ошибку, поэтому закомментированно)
console.log(group.students.length === 3);
