import * as R from 'ramda';

export const MSGS = {
  BILL_AMOUNT_INPUT: 'BILL_AMOUNT_INPUT',
  TIP_PERCENT_INPUT: 'TIP_PERCENT_INPUT',
};

export function billAmountInputMsg(billAmount) {
  return {
    type: MSGS.BILL_AMOUNT_INPUT,
    billAmount,
  };
}

export function tipPercentInputMsg(tipPercent) {
  return {
    type: MSGS.TIP_PERCENT_INPUT,
    tipPercent,
  };
}

const toMoney = R.curry((places, number) => {
  return R.pipe(parseFloat, a => a.toFixed(places), parseFloat)(number);
});

function update(msg, model) {
  switch (msg.type) {
    case MSGS.BILL_AMOUNT_INPUT: {
      if (msg.billAmount === '') return { ...model, billAmount: '' };
      const { billAmount } = msg;
      return { ...model, billAmount };
    }
    case MSGS.TIP_PERCENT_INPUT: {
      if (msg.tipPercent === '') return { ...model, billAmount: '' };
      const tipPercent = msg.tipPercent;
      return { ...model, tipPercent };
    }
    default:
      return model;
  }
}

export default update;
