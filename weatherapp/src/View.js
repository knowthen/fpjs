import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { locationInputMsg, removeLocationMsg, addLocationMsg } from './Update';

const { div, h1, label, input, pre, form, button, ul, li, span, i } = hh(h);

function locationForm(dispatch, model) {
  return div({ className: '' }, [
    form(
      {
        className: '',
        onsubmit: e => {
          e.preventDefault();
          dispatch(addLocationMsg);
        },
      },
      [
        label({ className: 'f6 b db mb2' }, 'Location'),
        input({
          className: 'pa2 w-60',
          value: model.location,
          oninput: e => dispatch(locationInputMsg(e.target.value)),
        }),
        button({ className: 'pv2 ph3 br1', type: 'submit' }, 'Add'),
      ],
    ),
  ]);
}

function cell(className, label, temp) {
  return div({ className }, [div({ className: 'f7 b' }, label), div({}, temp)]);
}

const location = R.curry((dispatch, loc) => {
  const { name, temp, low, high, id } = loc;
  return li(
    { className: 'pa3 bb b--light-silver flex justify-between relative' },
    [
      cell('w-60 tl', 'Location', name),
      cell('w-10 tc', 'Temp', temp),
      cell('w-10 tc', 'Low', low),
      cell('w-10 tc mr2', 'High', high),
      i({
        className:
          'relative top--1 right--1 mt1 mr1 fa fa-remove pointer black-40',
        onclick: () => dispatch(removeLocationMsg(id)),
      }),
    ],
  );
});

function locations(dispatch, model) {
  const locations = R.map(location(dispatch), model.locations);
  return ul({ className: 'list pl0 ml0 ba b--light-silver br' }, locations);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, ['Weather']),
    locationForm(dispatch, model),
    locations(dispatch, model),
  ]);
}

export default view;
