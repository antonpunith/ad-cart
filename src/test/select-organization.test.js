import React from 'react';
import ReactDOM from 'react-dom';
import SelectOrganization from '../app/components/select-organization';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectOrganization />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders component with data', () => {
  const orgList = [
    {
      "name": "default",
      "selected": true,
      "pricingRules": null
    }
  ];
  const SelectOrg = shallow(
    <SelectOrganization
      showDropDown={false}
      orgList={orgList}
      setOrganization={function () {}}
      toggleDropdown={function () {}}
    />
  );
  expect(SelectOrg.text()).toMatch('Selected organization: default. Click to change organization');
});

it('renders dropdown when showDropDown is true', () => {
  const orgList = [
    {
      "name": "default",
      "pricingRules": null
    },
    {
      "name": "Unilever",
      "selected": true,
      "pricingRules": null
    },
    {
      "name": "Apple",
      "pricingRules": null
    },
    {
      "name": "Nike",
      "pricingRules": null
    },
    {
      "name": "Ford",
      "pricingRules": null
    }
  ];
  const SelectOrg = shallow(
    <SelectOrganization
      showDropDown={true}
      orgList={orgList}
      setOrganization={function () {}}
      toggleDropdown={function () {}}
    />
  );
  expect(SelectOrg.find('.dropdown-link').text()).toMatch('Selected organization: Unilever. Click to change organization');
  expect(SelectOrg.find('.dropdown').text()).toMatch('Choose organizationdefaultChoose organizationUnileverChoose organizationAppleChoose organizationNikeChoose organizationFord');
});
