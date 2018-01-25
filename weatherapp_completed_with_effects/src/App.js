import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import axios from 'axios';
import * as R from 'ramda';

function httpEffects(dispatch, command) {
  if (command === null) {
    return;
  }
  const { request, successMsg } = command;
  axios(request).then(
    response => dispatch(successMsg(response)),
    // err => {
    //   // dispatch(errorMsg(err.response.data));
    // },
  );
}

function app(initModel, update, view, node) {
  let model = initModel;
  let command = null;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    const updates = update(msg, model);
    const isArray = R.type(updates) === 'Array';
    // [model, url] = isArray ? updates : [updates, null];
    // axios({url}).then(response => {
    //   // What to do with the response?
    // })
    // [model, command ] = isArray ? updates : [updates, null];
    model = isArray ? updates[0] : updates;
    const command = isArray ? updates[1] : null;
    httpEffects(dispatch, command);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;
