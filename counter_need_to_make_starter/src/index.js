import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const { div, button } = hh(h);

const initModel = 0;

function view(dispatch, model) {
  return div([
    div({ className: 'mv2' }, `Count: ${model}`),
    button({ className: 'pv1 ph2 mr2', 
      onclick: () => dispatch(MSGS.ADD) }, '+'),
    button({ className: 'pv1 ph2',
      onclick: () => dispatch(MSGS.SUBTRACT) }, '-'),
  ]);
}

const MSGS = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
};

function update(msg, model) {
  switch (msg) {
    case MSGS.ADD:
      return model + 1;
    case MSGS.SUBTRACT: 
      return model - 1;
    default:
      return model;
  }
}

// impure code below

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg){
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
} 

const rootNode = document.getElementById('app');

app(initModel, update, view, rootNode);

// rootNode.appendChild(view(update('minus', initModel)));