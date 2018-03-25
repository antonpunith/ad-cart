import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/index';
import data from '../data';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders page with data', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App data={data} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('initial total is 0', () => {
  const initApp = shallow(
    <App data={data} />
  );
  expect(initApp.find('.cart-total').text()).toMatch('Cart total : $0');
});

test('total for default - classic, standout, premium', () => {
  const defaultApp = mount(
    <App data={data} />
  );
  defaultApp.find('.add-button.classic').simulate('click');
  defaultApp.find('.add-button.standout').simulate('click');
  defaultApp.find('.add-button.premium').simulate('click');
  expect(defaultApp.find('.cart-total').text()).toMatch('Cart total : $987.97');
});

test('total for unilever - classic, classic, classic, premium', () => {
  const UnileverApp = mount(
    <App data={data} />
  );
  const state =  UnileverApp.state();
  state.selectedOrganization = {
    name: 'Unilever',
    selected: 1,
    pricingRules: {
      "classic": {
        "minBuy": 3,
        "productsOnOffer": 1,
        "specialPrice": 0
      }
    }
  };
  UnileverApp.setState(state);
  UnileverApp.find('.add-button.classic').simulate('click');
  UnileverApp.find('.add-button.classic').simulate('click');
  UnileverApp.find('.add-button.classic').simulate('click');
  UnileverApp.find('.add-button.premium').simulate('click');
  expect(UnileverApp.find('.cart-total').text()).toMatch('Cart total : $934.97');
});

test('total for Apple - standout, standout, standout, premium', () => {
  const AppleApp = mount(
    <App data={data} />
  );
  const state =  AppleApp.state();
  state.selectedOrganization = {
    name: 'Apple',
    selected: 1,
    pricingRules: {
      "standout": {
        "minBuy": 0,
        "specialPrice": 299.99
      }
    }
  };
  AppleApp.setState(state);
  AppleApp.find('.add-button.standout').simulate('click');
  AppleApp.find('.add-button.standout').simulate('click');
  AppleApp.find('.add-button.standout').simulate('click');
  AppleApp.find('.add-button.premium').simulate('click');
  expect(AppleApp.find('.cart-total').text()).toMatch('Cart total : $1294.9');
});

test('total for Nike - premium, premium, premium, premium', () => {
  const NikeApp = mount(
    <App data={data} />
  );
  const state =  NikeApp.state();
  state.selectedOrganization = {
    name: 'Nike',
    selected: 1,
    pricingRules: {
      "premium": {
        "minBuy": 4,
        "productsOnOffer": 4,
        "specialPrice": 379.99
      }
    }
  };
  NikeApp.setState(state);
  NikeApp.find('.add-button.premium').simulate('click');
  NikeApp.find('.add-button.premium').simulate('click');
  NikeApp.find('.add-button.premium').simulate('click');
  NikeApp.find('.add-button.premium').simulate('click');
  expect(NikeApp.find('.cart-total').text()).toMatch('Cart total : $1519.96');
});

test('total for Ford', () => {
  const FordApp = mount(
    <App data={data} />
  );
  const state =  FordApp.state();
  state.selectedOrganization = {
    name: 'Ford',
    selected: 1,
    pricingRules: {
      "classic": {
        "minBuy": 5,
        "productsOnOffer": 1,
        "specialPrice": 0
      },
      "standout": {
        "minBuy": 0,
        "specialPrice": 309.99
      },
      "premium": {
        "minBuy": 3,
        "specialPrice": 389.99
      }
    }
  };
  FordApp.setState(state);
  FordApp.find('.add-button.standout').simulate('click');
  expect(FordApp.find('.cart-total').text()).toMatch('Cart total : $309.99');
  FordApp.find('.add-button.classic').simulate('click');
  FordApp.find('.add-button.classic').simulate('click');
  FordApp.find('.add-button.classic').simulate('click');
  FordApp.find('.add-button.classic').simulate('click');
  FordApp.find('.add-button.classic').simulate('click');
  expect(FordApp.find('.cart-total').text()).toMatch('Cart total : $1389.95');
  FordApp.find('.add-button.premium').simulate('click');
  FordApp.find('.add-button.premium').simulate('click');
  expect(FordApp.find('.cart-total').text()).toMatch('Cart total : $2179.93');
  FordApp.find('.add-button.premium').simulate('click');
  expect(FordApp.find('.cart-total').text()).toMatch('Cart total : $2559.92');
});
