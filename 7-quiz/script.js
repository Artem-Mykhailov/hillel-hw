const QUIZ = [
  {
    question: "Сколько будет 2 + 2?",
    answer: "4",
    getAnswer: getStringAnswer,
  },
  {
    question: "Солнце встает на востоке?",
    answer: true,
    getAnswer: getBooleanAnswer,
  },
  {
    question: "Сколько будет 5 / 0?",
    answer: "infinity",
    getAnswer: getStringAnswer,
  },
  {
    question: "Какого цвета небо?",
    answer: "голубого",
    getAnswer: getStringAnswer,
  },
  {
    question:
      'Какой правильный ответ на "Главный вопрос жизни, вселенной и всего такого"?',
    answer: "42",
    getAnswer: getStringAnswer,
  },
];
const RIGHT_ANSWER = 10;
const WRONG_ANSWER = 0;
const POINTS = runQuiz(QUIZ);

showResult(POINTS);

function runQuiz(quiz) {
  return quiz.reduce((acc, current) => {
    return (
      acc +
      (getAnswer(current) === current.answer ? RIGHT_ANSWER : WRONG_ANSWER)
    );
  }, 0);
}

function getAnswer(current) {
  return current.getAnswer(current.question);
}

function getStringAnswer(question) {
  const answer = prompt(question);

  return answer ? answer.toLowerCase() : "";
}
function getBooleanAnswer(question) {
  return confirm(question);
}

function showResult(points) {
  alert(`Поздравляем! Ваш результат = ${points}`);
}

// const userAnswers = getQuestion(QUIZ);
// const POINTS = getResult(QUIZ, userAnswers);

// function getQuestion(arr) {
//   let answers = [];
//   for (i = 0; i < arr.length; i++) {
//     if (i === 1) {
//       answers.push(confirm(arr[i].question));
//     } else {
//       answers.push(prompt(arr[i].question));
//     }
//   }

//   return answers;
// }

// function getResult(answers, userAnswers) {
//   let res = 0;
//   for (i = 0; i < userAnswers.length; i++) {
//     if (answers[i].answer === userAnswers[i]) {
//       res += 10;
//     }
//   }

//   return res;
// }
