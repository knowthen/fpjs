import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { billAmountInputMsg, tipPercentInputMsg } from './Update';

const { div, h1, label, input, pre } = hh(h);

const formatMoney = R.curry((places, number) => {
  return R.pipe(parseFloat, R.defaultTo(0), a => a.toFixed(places))(number);
});

function calcTipAndTotal(billAmount, tipPercent) {
  const bill = parseFloat(billAmount);
  const tip = bill * parseFloat(tipPercent) / 100;
  return [tip, bill + tip];
}

function view(dispatch, model) {
  const { billAmount, tipPercent } = model;

  const [tip, total] = calcTipAndTotal(billAmount, tipPercent);

  const toMoney = formatMoney(2);

  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, ['Tip Calculator']),
    div({ className: '' }, [
      label({ className: 'db fw6 lh-copy f5' }, 'Bill Amount'),
      input({
        className: 'pa2 ba measure mb2',
        value: billAmount,
        oninput: e => dispatch(billAmountInputMsg(e.target.value)),
      }),
      label({ className: 'db fw6 lh-copy f5' }, 'Tip %'),
      input({
        className: 'pa2 ba measure',
        value: tipPercent,
        oninput: e => dispatch(tipPercentInputMsg(e.target.value)),
      }),
      div({ className: 'mv3 b' }, `Tip: $${toMoney(tip)}`),
      div({ className: 'mv3 b' }, `Total: $${toMoney(total)}`),
    ]),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
