import h from 'hyperscript';
import hh from 'hyperscript-helpers';

const { div, button } = hh(h);

const initModel = 0;

function view(model) {
  return div([
    div({ className: 'mv2' }, `Count: ${model}`),
    button({ className: 'pv1 ph2 mr2', 
      onclick: () => console.log('+ clicked!') }, '+'),
    button({ className: 'pv1 ph2',
      onclick: () => console.log('- clicked!') }, '-'),
  ]);
}

function update(msg, model) {
  switch (msg) {
    case 'plus':
      return model + 1;
    case 'minus':
      return model - 1;
    default:
      return model;
  }
}

const rootNode = document.getElementById('app');

rootNode.appendChild(view(update('minus', initModel)));