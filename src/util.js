/**
 * Many people aren’t great at arithmetic, including myself, so we’ll keep it within 10.
 */
function generateAdditionQuiz(optionCount) {
  const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;
  
  const num1 = getRandomNumber();
  const num2 = getRandomNumber();
  const correctAnswer = num1 + num2;
  
  const answers = new Set();
  answers.add(correctAnswer);
  
  while (answers.size < optionCount) {
      let randomAnswer = getRandomNumber() + getRandomNumber();
      answers.add(randomAnswer);
  }
  
  const shuffledAnswers = Array.from(answers).sort(() => Math.random() - 0.5);
  
  return {
      question: `${num1} + ${num2} = ?`,
      correctAnswer: correctAnswer,
      options: shuffledAnswers,
      id: uuid()
  };
}

function uuid() {
  return crypto.randomUUID().replace(/-/g, '');
}

function getUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

const util = {
  generateAdditionQuiz,
  uuid,
  getUnixTimestamp,
}
export default util