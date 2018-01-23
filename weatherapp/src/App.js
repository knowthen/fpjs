import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import axios from 'axios';

function httpEffects(dispatch, command) {
  if (!request) {
    return;
  }
  const { request, success, error } = command;
  if (!success) {
    return console.error('httpRequest without a success function');
  }
  if (!error) {
    return console.error('httpRequest without a error function');
  }
  axios(httpRequest).then(
    response => {
      dispatch(success(response));
    },
    err => {
      dispatch(error(error));
    },
  );
}

function app(initModel, update, view, node) {
  let model = initModel;
  let command = null;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    [model, command] = update(msg, model);
    httpEffects(dispatch, command);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;
