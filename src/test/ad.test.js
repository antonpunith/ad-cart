import React from 'react';
import ReactDOM from 'react-dom';
import Ad from '../app/components/ad';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ad />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders page with data', () => {
  const ad = {
    "id": "classic",
    "name": "Classic Ad",
    "price": "269.99"
  };
  const cart = [
    { id: "classic", items: 3, total: 269.99 * 3 }
  ];
  const adClassic = shallow(
    <Ad ad={ad} cart={cart} incrementCart={function() { }} decrementCart={function() { }}  />
  );
  expect(adClassic.find('h2').text()).toMatch('Classic Ad');
  expect(adClassic.find('.regular-price').text()).toMatch('Regular Price: $269.99');
  expect(adClassic.find('p.large-text').text()).toMatch('Subtotal: $809.97');
});
