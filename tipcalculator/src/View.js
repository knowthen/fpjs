import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { 
  billAmountInputMsg,
  tipPercentInputMsg 
} from './Update';

const { 
  div, 
  h1, 
  label, 
  input, 
  pre 
} = hh(h);

const round = places =>
  R.pipe(
    num => num * Math.pow(10, places),
    Math.round,
    num => num * Math.pow(10, -1 * places),
  );

const formatMoney = R.curry(
  (symbol, places, number) => {
    return R.pipe(
      R.defaultTo(0),
      round(places),
      num => num.toFixed(places),
      R.concat(symbol),
    )(number);
  }
);

function calcTipAndTotal(billAmount, tipPercent) {
  const bill = parseFloat(billAmount);
  const tip = bill * parseFloat(tipPercent) / 100 || 0;
  return [tip, bill + tip];
}

function inputSet(name, value, oninput) {
  return div({ className: 'w-40' }, [
    label({ className: 'db fw6 lh-copy f5' }, name),
    input({
      className: 'border-box pa2 ba mb2 tr w-100',
      type: 'text',
      value,
      oninput,
    }),
  ]);
}

function calculatedAmounts(tip, total) {
  return div({ className: 'w-40 b bt mt2 pt2' }, [
    calculatedAmount('Tip:', tip),
    calculatedAmount('Total:', total),
  ]);
}

function calculatedAmount(description, amount) {
  return div({ className: 'flex w-100' }, [
    div({ className: 'w-50 pv1 pr2' }, description),
    div({ className: 'w-50 tr pv1 pr2' }, amount),
  ]);
}

function view(dispatch, model) {
  const { billAmount, tipPercent } = model;

  const [tip, total] = calcTipAndTotal(billAmount, tipPercent);

  const toMoney = formatMoney('$', 2);

  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputSet('Bill Amount', billAmount, e =>
      dispatch(billAmountInputMsg(e.target.value)),
    ),
    inputSet('Tip %', tipPercent, e =>
      dispatch(tipPercentInputMsg(e.target.value)),
    ),
    calculatedAmounts(toMoney(tip), toMoney(total)),
  ]);
}

export default view;
