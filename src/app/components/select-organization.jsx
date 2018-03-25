import React, { Component } from 'react';

class SelectOrganization extends Component {

  renderOrg(setOrganization) {
    return ((organization, key) => {
      let className = "dropdown-item";
      if (organization.selected) {
        className += " selected";
      }
      return(
          <button className={className} key={key} onClick={setOrganization(organization)}>
            <span className="screen-reader-only">Choose organization</span>
            {organization.name}
          </button>
      );
    });
  }

  showActive(toggleDropdown) {
    return ((organization, key) => {
      if(!organization.selected) {
        return null;
      }
      return (
        <button className="dropdown-link" onClick={toggleDropdown} key={key} href="#">
          <span className="screen-reader-only">Selected organization: </span>
          {organization.name}
          <span className="screen-reader-only">. Click to change organization</span>
        </button>)
    });
  }

  renderDropDown (orgList, showDropDown, setOrganization) {
    if(!showDropDown) {
      return null;
    }
    return (
      <div className="dropdown">
        {orgList.map(this.renderOrg(setOrganization, showDropDown))}
      </div>
    );
  }

  render () {
    const {orgList, setOrganization, toggleDropdown, showDropDown, ...props} = this.props;
    if(!orgList) {
      return null;
    }
    const dropdown = this.renderDropDown(orgList, showDropDown, setOrganization);
    return (
      <div {...props}>
        <div className="dropdown-container">
          {orgList.map(this.showActive(toggleDropdown))}
          {dropdown}
        </div>
      </div>
    );
  }
}

export default SelectOrganization;
