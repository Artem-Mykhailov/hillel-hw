const students = [
  {
    id: 10,
    name: "John Smith",
    marks: [10, 8, 6, 9, 8, 7],
  },
  {
    id: 11,
    name: "John Doe",
    marks: [9, 8, 7, 6, 7],
  },
  {
    id: 12,
    name: "Thomas Anderson",
    marks: [6, 7, 10, 8],
  },
  {
    id: 13,
    name: "Jean-Baptiste Emanuel Zorg",
    marks: [10, 9, 8, 9],
  },
];

function averageStudentMark(id) {
  const student = students.find((stud) => stud.id === id);

  const averageMark = student.marks.reduce((acc, current) => {
    return acc + current;
  });

  return averageMark / student.marks.length;
}

function averageGroupMark(arr) {
  let studentsId = [];
  let studentMarks = [];

  for (let i = 0; i < arr.length; i++) {
    studentsId.push(arr[i].id);
  }

  for (let i = 0; i < studentsId.length; i++) {
    studentMarks.push(averageStudentMark(studentsId[i]));
  }

  const groupMark = studentMarks.reduce((acc, current) => {
    return acc + current;
  });

  return groupMark / studentMarks.length;
}

console.log(averageStudentMark(10));
console.log(averageGroupMark(students));
