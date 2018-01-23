import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import {
  questionInputMsg,
  answerInputMsg,
  saveMsg,
  showAnswerMsg,
  scoreMsg,
  newCardMsg,
  editCardMsg,
  deleteCardMsg,
  SCORES,
} from './Update';

const { div, h1, label, input, pre, a, button, span, textarea, i } = hh(h);

function gradeButtons(dispatch, card) {
  const { showAnswer } = card;
  return showAnswer
    ? div(
        { className: 'absolute bottom-0 left-0 w-100 ph2' },
        div({ className: 'mv2 flex justify-between' }, [
          button(
            {
              className: 'f4 ph3 pv2 bg-red bn white br1',
              onclick: () => dispatch(scoreMsg(card.id, SCORES.BAD)),
            },
            'Bad',
          ),
          button(
            {
              className: 'f4 ph3 pv2 bg-blue bn white br1',
              onclick: () => dispatch(scoreMsg(card.id, SCORES.GOOD)),
            },
            'Good',
          ),
          button(
            {
              className: 'f4 ph3 pv2 bg-dark-green bn white br1',
              onclick: () => dispatch(scoreMsg(card.id, SCORES.GREAT)),
            },
            'Great',
          ),
        ]),
      )
    : null;
}

function remove(dispatch, card) {
  return i({
    className: 'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer',
    onclick: () => dispatch(deleteCardMsg(card.id)),
  });
}

function question(dispatch, card) {
  return div({ className: '' }, [
    div({ className: 'b f6 mv1 underline ph1' }, 'Question'),
    div(
      { className: 'pointer  hover-bg-black-10  bg-animate pv2 ph1', onclick: () => dispatch(editCardMsg(card.id)) },
      card.question,
    ),
  ]);
}

function editQuestion(dispatch, card) {
  return div({ className: '' }, [
    div({ className: 'b f6 mv1' }, 'Question'),
    textarea({
      className: 'w-100 bg-washed-yellow outline-0 h4',
      value: card.question,
      oninput: e => dispatch(questionInputMsg(card.id, e.target.value)),
    }),
  ]);
}

function answer(dispatch, card) {
  const { showAnswer } = card;
  return showAnswer
    ? div([
        div({ className: 'b f6 mv1 ph1 underline' }, 'Answer'),
        div(
          {
            className: 'pointer hover-bg-black-10 bg-animate pv2 ph1',
            onclick: () => dispatch(editCardMsg(card.id)),
          },
          card.answer,
        ),
      ])
    : div(
        a(
          {
            className: 'f6 underline link pointer',
            onclick: () => dispatch(showAnswerMsg(card.id)),
          },
          'Show Answer',
        ),
      );
}

function editAnswer(dispatch, card) {
  return div({ className: '' }, [
    div({ className: 'b f6 mv1' }, 'Answer'),
    textarea({
      className: 'w-100 bg-washed-yellow outline-0 h4',
      value: card.answer,
      oninput: e => dispatch(answerInputMsg(card.id, e.target.value)),
    }),
  ]);
}

function viewCard(dispatch, card) {
  return div(
    { className: 'w-third pa2' },
    div(
      {
        className: 'w-100 h-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5',
      },
      [
        question(dispatch, card),
        answer(dispatch, card),
        gradeButtons(dispatch, card),
        remove(dispatch, card),
      ],
    ),
  );
}

function editCard(dispatch, card) {
  return div(
    { className: 'w-third pa2' },
    div({ className: 'w-100 h-100 pa2 bg-light-yellow mv2 shadow-1 relative' }, [
      editQuestion(dispatch, card),
      editAnswer(dispatch, card),
      button(
        {
          className: 'f4 ph3 pv2 br1 bg-gray bn white mv2',
          onclick: () => dispatch(saveMsg(card.id)),
        },
        'Save',
      ),
      remove(dispatch, card),
    ]),
  );
}

const card = R.curry((dispatch, card) => {
  const { edit } = card;
  return edit ? editCard(dispatch, card) : viewCard(dispatch, card);
});

function view(dispatch, model) {
  const cards = R.map(
    card(dispatch), 
    model.cards
  );
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, ['Flashcard Study']),
    div(
      button(
        {
          className: 'pa2 br1 mv2 bg-green bn white',
          onclick: () => dispatch(newCardMsg),
        },
        [i({ className: 'fa fa-plus ph1' }), 'Add Flashcard'],
      ),
    ),
    div({ className: 'flex flex-wrap nl2 nr2' }, cards),
    // pre({ className: 'pre truncate'}, JSON.stringify(model, null, 2)),
  ]);
}

export default view;
