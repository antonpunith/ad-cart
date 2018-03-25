import React, { Component } from 'react';

class Header extends Component {

  render () {
    const {title, children, ...props} = this.props;

    return (
      <header className="header" {...props}>
        <div className="container">
          <div className="flex-row space-between">
            <h1>{title}</h1>
            {children}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
