const initModel = {
  nextId: 3,
  cards: [
    {
      id: 2,
      question: 'What is currying?',
      answer: `currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument.`,
      rank: 0,
      showAnswer: false,
      edit: false,
    },
    {
      id: 1,
      question: 'What is partial application?',
      answer: `Providing a function with fewer arguments than it takes, what's returned is a new function that takes the remaining parameters.`,
      rank: 0,
      showAnswer: false,
      edit: false,
    },
    {
      id: 0,
      question: 'Why use immutable data structures?',
      answer: `To start with, it's the simplest type of data, and...`,
      rank: 0,
      showAnswer: false,
      edit: false,
    },
  ],
};

export default initModel;
