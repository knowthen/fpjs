import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import axios from 'axios';
import * as R from 'ramda';

function httpEffects(dispatch, command) {
  if (!command) {
    return;
  }
  const { request, successMsg, errorMsg } = command;
  axios(request).then(
    response => {
      dispatch(successMsg(response));
    },
    err => {
      dispatch(errorMsg(err.response.data));
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
    const val = update(msg, model);
    [model, command] = R.type(val) === 'Array' ? val : [val, null];
    httpEffects(dispatch, command);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;
